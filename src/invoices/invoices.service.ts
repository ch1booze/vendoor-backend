import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UpdateInvoiceDto,
  AddInvoiceItemsDto,
  UpdateInvoiceItemDto,
  InvoiceStatus,
} from './invoices.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  private async verifyInvoiceAccess(invoiceId: string, userId: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        items: {
          some: {
            product: {
              business: {
                userId,
              },
            },
          },
        },
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                business: true,
              },
            },
          },
        },
      },
    });

    if (!invoice) {
      throw new ForbiddenException('You do not have access to this invoice');
    }

    return invoice;
  }

  async createInvoice(businessId: string) {
    const newInvoice = await this.prisma.invoice.create({
      data: { businessId, status: InvoiceStatus.DRAFTED },
    });
    return newInvoice;
  }

  async getInvoices(businessId: string) {
    return await this.prisma.invoice.findMany({
      where: { businessId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                unit: true,
                category: true,
              },
            },
          },
        },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getInvoice(invoiceId: string) {
    return await this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                unit: true,
                category: true,
                business: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        payment: true,
      },
    });
  }

  async updateInvoice(
    invoiceId: string,
    userId: string,
    dto: UpdateInvoiceDto,
  ) {
    const invoice = await this.verifyInvoiceAccess(invoiceId, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot update reconciled invoice');
    }

    await this.prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: dto.status },
    });

    return { message: 'Invoice updated successfully' };
  }

  async deleteInvoice(userId: string, invoiceId: string) {
    const invoice = await this.verifyInvoiceAccess(invoiceId, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot delete reconciled invoice');
    }

    await this.prisma.invoice.delete({
      where: { id: invoiceId },
    });

    return { message: 'Invoice deleted successfully' };
  }

  async addInvoiceItems(
    invoiceId: string,
    userId: string,
    dto: AddInvoiceItemsDto,
  ) {
    const invoice = await this.verifyInvoiceAccess(invoiceId, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot modify reconciled invoice');
    }
    await this.prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: {
          id: { in: dto.items.map((item) => item.productId) },
          isActive: true,
        },
      });

      if (products.length !== dto.items.length) {
        throw new BadRequestException('One or more products are invalid');
      }

      await tx.invoiceItem.deleteMany({ where: { invoiceId } });
      await tx.invoiceItem.createMany({
        data: dto.items.map((item) => ({
          invoiceId,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    });
  }

  async getInvoiceItems(userId: string, invoiceId: string) {
    await this.verifyInvoiceAccess(invoiceId, userId);

    return await this.prisma.invoiceItem.findMany({
      where: { invoiceId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            unit: true,
            category: true,
          },
        },
      },
    });
  }

  async updateInvoiceItem(
    invoiceId: string,
    itemId: string,
    userId: string,
    dto: UpdateInvoiceItemDto,
  ) {
    const invoice = await this.verifyInvoiceAccess(invoiceId, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot modify reconciled invoice');
    }

    const invoiceItem = await this.prisma.invoiceItem.findFirst({
      where: {
        id: itemId,
        invoiceId,
      },
    });

    if (!invoiceItem) {
      throw new NotFoundException('Invoice item not found');
    }

    const updatedItem = await this.prisma.invoiceItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            unit: true,
            category: true,
          },
        },
      },
    });

    return updatedItem;
  }

  async removeInvoiceItem(invoiceId: string, itemId: string, userId: string) {
    const invoice = await this.verifyInvoiceAccess(invoiceId, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot modify reconciled invoice');
    }

    const invoiceItem = await this.prisma.invoiceItem.findFirst({
      where: {
        id: itemId,
        invoiceId,
      },
    });

    if (!invoiceItem) {
      throw new NotFoundException('Invoice item not found');
    }

    await this.prisma.invoiceItem.delete({
      where: { id: itemId },
    });

    return { message: 'Invoice item removed successfully' };
  }
}
