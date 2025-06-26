import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerChatDto, CreateCustomerDto } from './customers.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async createCustomer(dto: CreateCustomerDto) {
    return await this.prisma.customer.create({ data: dto });
  }

  async createCustomerChat(customerId: string, dto: CreateCustomerChatDto) {
    const reply = 'REPLY GOES HERE';
    return await this.prisma.customerChat.create({
      data: { customerId, businessId: dto.businessId, query: dto.query, reply },
    });
  }
}
