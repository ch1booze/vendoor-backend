import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  UpdateInvoiceBody,
  AddInvoiceItemsBody,
  UpdateInvoiceItemBody,
  InvoiceStatus,
} from './invoices.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceItem } from '../entities/invoice-item.entity';
import { Product } from '../entities/product.entity';
import { Repository, In, DataSource } from 'typeorm';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemRepository: Repository<InvoiceItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  private async verifyInvoiceAccess(invoiceId: string, userId: string) {
    const invoice = await this.invoiceRepository
      .createQueryBuilder('invoice')
      .innerJoin('invoice.business', 'business')
      .where('invoice.id = :invoiceId', { invoiceId })
      .andWhere('business.userId = :userId', { userId })
      .getOne();

    if (!invoice) {
      throw new ForbiddenException('You do not have access to this invoice');
    }

    return invoice;
  }

  async createInvoice(businessId: string) {
    const newInvoiceEntity = this.invoiceRepository.create({
      businessId,
      status: InvoiceStatus.DRAFTED,
    });
    return this.invoiceRepository.save(newInvoiceEntity);
  }

  async getInvoices(businessId: string) {
    return this.invoiceRepository.find({
      where: { businessId },
      relations: {
        items: {
          product: true,
        },
        payment: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async getInvoice(invoiceId: string) {
    return this.invoiceRepository.findOne({
      where: { id: invoiceId },
      relations: {
        items: {
          product: true,
        },
        payment: true,
        business: true,
      },
    });
  }

  async updateInvoice(
    invoiceId: string,
    userId: string,
    body: UpdateInvoiceBody,
  ) {
    const invoice = await this.verifyInvoiceAccess(invoiceId, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot update reconciled invoice');
    }

    invoice.status = body.status;
    return this.invoiceRepository.save(invoice);
  }

  async deleteInvoice(userId: string, invoiceId: string) {
    const invoice = await this.verifyInvoiceAccess(invoiceId, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot delete reconciled invoice');
    }

    await this.invoiceRepository.delete(invoiceId);
    return { message: 'Invoice deleted successfully' };
  }

  async addInvoiceItems(
    invoiceId: string,
    userId: string,
    body: AddInvoiceItemsBody,
  ) {
    const invoice = await this.verifyInvoiceAccess(invoiceId, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot modify reconciled invoice');
    }

    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const productIds = body.items.map((item) => item.productId);
      const products = await transactionalEntityManager.find(Product, {
        where: { id: In(productIds), isActive: true },
      });

      if (products.length !== body.items.length) {
        throw new BadRequestException(
          'One or more products are invalid or inactive',
        );
      }

      await transactionalEntityManager.delete(InvoiceItem, { invoiceId });

      const newItems = body.items.map((item) =>
        transactionalEntityManager.create(InvoiceItem, {
          invoiceId,
          productId: item.productId,
          quantity: item.quantity,
        }),
      );
      return transactionalEntityManager.save(newItems);
    });
  }

  async getInvoiceItems(userId: string, invoiceId: string) {
    await this.verifyInvoiceAccess(invoiceId, userId);

    return this.invoiceItemRepository.find({
      where: { invoiceId },
      relations: {
        product: true,
      },
    });
  }

  async updateInvoiceItem(
    invoiceId: string,
    itemId: string,
    userId: string,
    body: UpdateInvoiceItemBody,
  ) {
    const invoice = await this.verifyInvoiceAccess(invoiceId, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot modify reconciled invoice');
    }

    const invoiceItem = await this.invoiceItemRepository.findOneBy({
      id: itemId,
      invoiceId,
    });

    if (!invoiceItem) {
      throw new NotFoundException('Invoice item not found');
    }

    invoiceItem.quantity = body.quantity;
    return this.invoiceItemRepository.save(invoiceItem);
  }

  async removeInvoiceItem(invoiceId: string, itemId: string, userId: string) {
    const invoice = await this.verifyInvoiceAccess(invoiceId, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot modify reconciled invoice');
    }

    const result = await this.invoiceItemRepository.delete({
      id: itemId,
      invoiceId,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Invoice item not found');
    }

    return { message: 'Invoice item removed successfully' };
  }
}
