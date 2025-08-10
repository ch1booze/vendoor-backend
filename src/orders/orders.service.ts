import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  UpdateOrderBody,
  AddOrderItemsBody,
  UpdateOrderItemBody,
  OrderStatus,
} from './orders.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';
import { Repository, In, DataSource } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  private async verifyOrderAccess(orderId: string, userId: string) {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoin('order.business', 'business')
      .where('order.id = :orderId', { orderId })
      .andWhere('business.userId = :userId', { userId })
      .getOne();

    if (!order) {
      throw new ForbiddenException('You do not have access to this order');
    }

    return order;
  }

  async createOrder(businessId: string) {
    const newOrderEntity = this.orderRepository.create({
      businessId,
      status: OrderStatus.DRAFTED,
    });
    return this.orderRepository.save(newOrderEntity);
  }

  async getOrders(businessId: string) {
    return this.orderRepository.find({
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

  async getOrder(orderId: string) {
    return this.orderRepository.findOne({
      where: { id: orderId },
      relations: {
        items: {
          product: true,
        },
        payment: true,
        business: true,
      },
    });
  }

  async updateOrder(orderId: string, userId: string, body: UpdateOrderBody) {
    const order = await this.verifyOrderAccess(orderId, userId);

    if (order.status === OrderStatus.RECONCILED) {
      throw new BadRequestException('Cannot update reconciled order');
    }

    order.status = body.status;
    return this.orderRepository.save(order);
  }

  async deleteOrder(userId: string, orderId: string) {
    const order = await this.verifyOrderAccess(orderId, userId);

    if (order.status === OrderStatus.RECONCILED) {
      throw new BadRequestException('Cannot delete reconciled order');
    }

    await this.orderRepository.delete(orderId);
    return { message: 'Order deleted successfully' };
  }

  async addOrderItems(
    orderId: string,
    userId: string,
    body: AddOrderItemsBody,
  ) {
    const order = await this.verifyOrderAccess(orderId, userId);

    if (order.status === OrderStatus.RECONCILED) {
      throw new BadRequestException('Cannot modify reconciled order');
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

      await transactionalEntityManager.delete(OrderItem, { orderId });

      const newItems = body.items.map((item) =>
        transactionalEntityManager.create(OrderItem, {
          orderId,
          productId: item.productId,
          quantity: item.quantity,
        }),
      );
      return transactionalEntityManager.save(newItems);
    });
  }

  async getOrderItems(userId: string, orderId: string) {
    await this.verifyOrderAccess(orderId, userId);

    return this.orderItemRepository.find({
      where: { orderId },
      relations: {
        product: true,
      },
    });
  }

  async updateOrderItem(
    orderId: string,
    itemId: string,
    userId: string,
    body: UpdateOrderItemBody,
  ) {
    const order = await this.verifyOrderAccess(orderId, userId);

    if (order.status === OrderStatus.RECONCILED) {
      throw new BadRequestException('Cannot modify reconciled order');
    }

    const orderItem = await this.orderItemRepository.findOneBy({
      id: itemId,
      orderId,
    });

    if (!orderItem) {
      throw new NotFoundException('Order item not found');
    }

    orderItem.quantity = body.quantity;
    return this.orderItemRepository.save(orderItem);
  }

  async removeOrderItem(orderId: string, itemId: string, userId: string) {
    const order = await this.verifyOrderAccess(orderId, userId);

    if (order.status === OrderStatus.RECONCILED) {
      throw new BadRequestException('Cannot modify reconciled order');
    }

    const result = await this.orderItemRepository.delete({
      id: itemId,
      orderId,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Order item not found');
    }

    return { message: 'Order item removed successfully' };
  }
}
