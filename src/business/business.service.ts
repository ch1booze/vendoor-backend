import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateBusinessBody,
  CreateBusinessChatBody,
  UpdateBusinessBody,
} from './business.types';

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

  async createBusiness(
    userId: string,
    { name, description, data, tags }: CreateBusinessBody,
  ) {
    return await this.prisma.business.create({
      data: { userId, name, description, data, tags },
    });
  }

  async updateBusiness(
    userId: string,
    { name, description, data, tags }: UpdateBusinessBody,
  ) {
    return await this.prisma.business.update({
      where: { userId },
      data: { name, description, data, tags },
    });
  }

  async deleteBusiness(userId: string) {
    return await this.prisma.business.delete({ where: { userId } });
  }

  async getBusiness(userId: string) {
    return await this.prisma.business.findUniqueOrThrow({
      where: { userId },
    });
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

  async getBusinessChats(userId: string, skip = 0, take = 20) {
    const business = await this.getBusiness(userId);

    return await this.prisma.businessChat.findMany({
      where: { businessId: business.id },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBusinessCustomers(userId: string, skip = 0, take = 20) {
    await this.getBusiness(userId);

    return await this.prisma.customer.findMany({
      where: {
        businesses: {
          some: { userId },
        },
      },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBusinessCustomerChats(
    userId: string,
    customerId: string,
    skip = 0,
    take = 20,
  ) {
    const business = await this.getBusiness(userId);

    return await this.prisma.customerChat.findMany({
      where: { customerId, businessId: business.id },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }
}
