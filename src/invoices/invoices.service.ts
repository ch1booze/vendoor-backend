import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvoiceStatus } from '@prisma/client';
import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
  AddInvoiceItemDto,
  UpdateInvoiceItemDto,
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

  private async verifyBusinessOwnership(businessId: string, userId: string) {
    const business = await this.prisma.business.findFirst({
      where: { id: businessId, userId },
    });

    if (!business) {
      throw new ForbiddenException('You do not have access to this business');
    }

    return business;
  }

  async createInvoice(businessId: string, dto: CreateInvoiceDto) {
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: dto.items.map((item) => item.productId) },
        businessId,
        isActive: true,
      },
    });

    if (products.length !== dto.items.length) {
      throw new BadRequestException(
        'One or more products not found or inactive',
      );
    }

    await this.prisma.$transaction(async (tx) => {
      const newInvoice = await tx.invoice.create({ data: { businessId } });

      await tx.invoiceItem.createMany({
        data: dto.items.map((item) => ({
          invoiceId: newInvoice.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      return newInvoice;
    });
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

  async getInvoice(id: string) {
    return await this.prisma.invoice.findUnique({
      where: { id },
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

  async updateInvoice(id: string, userId: string, dto: UpdateInvoiceDto) {
    const invoice = await this.verifyInvoiceAccess(id, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot update reconciled invoice');
    }

    await this.prisma.$transaction(async (tx) => {
      if (dto.items) {
        const productIds = dto.items.map((item) => item.productId);
        const products = await tx.product.findMany({
          where: {
            id: { in: productIds },
            business: { userId },
            isActive: true,
          },
        });

        if (products.length !== productIds.length) {
          throw new BadRequestException(
            'One or more products not found or not accessible',
          );
        }

        await tx.invoiceItem.deleteMany({
          where: { invoiceId: id },
        });

        await tx.invoiceItem.createMany({
          data: dto.items.map((item) => ({
            invoiceId: id,
            productId: item.productId,
            quantity: item.quantity,
          })),
        });
      }

      const updated = await tx.invoice.update({
        where: { id },
        data: {
          status: dto.status ?? invoice.status,
        },
      });

      if (
        dto.status &&
        dto.status !== InvoiceStatus.DRAFTED &&
        invoice.status === InvoiceStatus.DRAFTED
      ) {
        const itemsToUpdate = dto.items || invoice.items;
        await tx.product.updateMany({
          where: {
            id: {
              in: itemsToUpdate.map((item) => item.productId),
            },
          },
          data: {
            isPurchased: true,
          },
        });
      }

      return updated;
    });

    return await this.getInvoice(id);
  }

  async deleteInvoice(userId: string, id: string) {
    const invoice = await this.verifyInvoiceAccess(id, userId);

    // Prevent deletion of reconciled invoices
    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot delete reconciled invoice');
    }

    await this.prisma.invoice.delete({
      where: { id },
    });

    return { message: 'Invoice deleted successfully' };
  }

  // Invoice Items methods
  async addInvoiceItem(
    invoiceId: string,
    userId: string,
    dto: AddInvoiceItemDto,
  ) {
    const invoice = await this.verifyInvoiceAccess(invoiceId, userId);

    if (invoice.status === InvoiceStatus.RECONCILED) {
      throw new BadRequestException('Cannot modify reconciled invoice');
    }

    // Verify product exists and is accessible
    const product = await this.prisma.product.findFirst({
      where: {
        id: dto.productId,
        business: { userId },
        isActive: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found or not accessible');
    }

    const invoiceItem = await this.prisma.invoiceItem.create({
      data: {
        invoiceId,
        productId: dto.productId,
        quantity: dto.quantity,
      },
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

    return invoiceItem;
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
