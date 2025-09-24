import { Injectable } from '@nestjs/common';
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
    return await this.prisma.order.create({
      data: {
        customerId: userId,
        businessId,
        status,
        items: { createMany: { data: body.items } },
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
      const existingOrder = await tx.order.findUnique({
        where: { customerId: userId, id: orderId, businessId },
      });

      if (existingOrder) {
        const status: CustomerOrderStatus = 'drafted';
        await tx.orderItem.deleteMany({ where: { orderId } });
        await tx.orderItem.createMany({
          data: body.items.map((item) => {
            return { ...item, status, orderId };
          }),
        });
      }
    });
  }

  async confirmOrder(userId: string, businessId: string, orderId: string) {
    const existingOrder = await this.prisma.order.findUnique({
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
    const existingOrder = await this.prisma.order.findUnique({
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
