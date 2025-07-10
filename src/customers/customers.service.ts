import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerChatBody, CreateCustomerBody } from './customers.types';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CustomersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async createCustomer(body: CreateCustomerBody) {
    return await this.prisma.customer.create({ data: body });
  }

  async createCustomerChat(customerId: string, body: CreateCustomerChatBody) {
    const { businessId, query } = body;
    const reply = 'REPLY HERE';
    if (reply) {
      return await this.prisma.customerChat.create({
        data: {
          customerId,
          businessId: body.businessId,
          query: body.query,
          reply,
        },
      });
    }
  }

  async getCustomerChats(customerId: string, businessId: string) {
    return await this.prisma.customerChat.findMany({
      where: { customerId, businessId },
    });
  }
}
