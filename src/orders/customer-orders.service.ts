import { BadRequestException, Injectable } from '@nestjs/common';
import {
  UpsertOrderBody,
  GetOrdersQuery,
  CustomerOrderStatus,
} from './orders.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: string, businessId: string, body: UpsertOrderBody) {
    const status: CustomerOrderStatus = 'drafted';

    const itemsData = await Promise.all(
      body.items.map(async ({ productId, quantity }) => {
        const foundProduct = await this.prisma.product.findUniqueOrThrow({
          where: { id: productId },
        });

        if (foundProduct.stock < quantity)
          throw new BadRequestException('Insufficient stock');

        return { ...foundProduct, quantity };
      }),
    );

    return await this.prisma.order.create({
      data: {
        customerId: userId,
        businessId,
        status,
        items: {
          createMany: {
            data: itemsData,
          },
        },
      },
    });
  }

  async getOrders(userId: string, businessId: string, query: GetOrdersQuery) {
    return await this.prisma.order.findMany({
      where: { customerId: userId, businessId },
    });
  }

  async getOrder(userId: string, businessId: string, orderId: string) {
    return await this.prisma.order.findMany({
      where: { customerId: userId, businessId, id: orderId },
    });
  }

  async updateOrder(
    userId: string,
    businessId: string,
    orderId: string,
    body: UpsertOrderBody,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      const existingOrder = await tx.order.findUniqueOrThrow({
        where: { customerId: userId, id: orderId, businessId },
      });

      if (existingOrder) {
        const status: CustomerOrderStatus = 'drafted';
        await tx.orderItem.deleteMany({ where: { orderId } });

        const itemsData = await Promise.all(
          body.items.map(async ({ productId, quantity }) => {
            const foundProduct = await tx.product.findUniqueOrThrow({
              where: { id: productId },
            });

            if (foundProduct.stock < quantity)
              throw new BadRequestException('Insufficient stock');

            return { ...foundProduct, quantity };
          }),
        );

        await tx.order.update({
          data: { status, items: { createMany: { data: itemsData } } },
          where: { id: orderId },
        });
      }
    });
  }

  async confirmOrder(userId: string, businessId: string, orderId: string) {
    const existingOrder = await this.prisma.order.findUniqueOrThrow({
      where: { customerId: userId, id: orderId, businessId },
    });

    if (existingOrder) {
      const status: CustomerOrderStatus = 'confirmed';
      return await this.prisma.order.update({
        where: { id: orderId },
        data: { status },
      });
    }
  }

  async cancelOrder(userId: string, businessId: string, orderId: string) {
    const existingOrder = await this.prisma.order.findUniqueOrThrow({
      where: { customerId: userId, id: orderId, businessId },
    });

    const draftedStatus: CustomerOrderStatus = 'drafted';
    if (existingOrder && existingOrder.status === draftedStatus) {
      const cancelledStatus: CustomerOrderStatus = 'cancelled';
      return await this.prisma.order.update({
        where: { id: orderId },
        data: { status: cancelledStatus },
      });
    }
  }
}
