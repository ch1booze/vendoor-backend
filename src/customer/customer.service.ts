import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerChatBody } from './customer.types';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async createCustomer(userId: string) {
    return await this.prisma.customer.create({ data: { userId } });
  }

  async getCustomer(userId: string) {
    return await this.prisma.customer.findUniqueOrThrow({ where: { userId } });
  }

  async createCustomerChat(
    userId: string,
    businessId: string,
    { query }: CreateCustomerChatBody,
  ) {
    return await this.prisma.customerChat.create({
      data: {
        customerId: userId,
        businessId,
        query,
        reply: 'YOUR REPLY GOES HERE',
      },
    });
  }

  async getCustomerChats(userId: string, businessId: string) {
    return await this.prisma.customerChat.findMany({
      where: { customerId: userId, businessId },
    });
  }
}
