import { PrismaService } from 'src/prisma/prisma.service';
import {
  CustomerOrderStatus,
  GetOrdersQuery,
  UpdateOrderStatusBody,
} from './orders.types';

export class BusinessOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(userId: string, query: GetOrdersQuery) {
    return await this.prisma.order.findMany({
      where: { business: { userId } },
    });
  }

  async getOrder(userId: string, orderId: string) {
    return await this.prisma.order.findUniqueOrThrow({
      where: { business: { userId }, id: orderId },
    });
  }

  async updateOrderStatus(
    userId: string,
    orderId: string,
    { status }: UpdateOrderStatusBody,
  ) {
    const existingOrder = await this.prisma.order.findUniqueOrThrow({
      where: { business: { userId }, id: orderId },
    });
    const confirmedStatus: CustomerOrderStatus = 'confirmed';

    if (existingOrder && existingOrder.status === confirmedStatus) {
      return await this.prisma.order.update({
        where: { id: orderId },
        data: { status },
      });
    }
  }
}
