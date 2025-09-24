import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBusinessBody, CreateBusinessChatBody } from './business.types';

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

  async createBusiness(
    userId: string,
    { name, description, data }: CreateBusinessBody,
  ) {
    return await this.prisma.business.create({
      data: { userId, name, description, data },
    });
  }

  async getBusiness(userId: string) {
    return await this.prisma.business.findUnique({ where: { userId } });
  }

  async createBusinessChat(userId: string, { query }: CreateBusinessChatBody) {
    return await this.prisma.businessChat.create({
      data: {
        business: { connect: { userId } },
        query,
        reply: 'YOUR REPLY GOES HERE',
      },
    });
  }

  async getBusinessChats(userId: string) {
    return await this.prisma.businessChat.findMany({
      where: { business: { userId } },
    });
  }

  async getBusinessCustomers(userId: string) {
    return await this.prisma.customer.findMany({
      where: { businesses: { every: { userId } } },
    });
  }

  async getBusinessCustomerChats(userId: string, customerId: string) {
    return await this.prisma.customerChat.findMany({
      where: { customerId, business: { userId } },
    });
  }
}
