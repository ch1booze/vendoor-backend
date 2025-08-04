import { Injectable } from '@nestjs/common';
import { CreateCustomerChatBody, CreateCustomerBody } from './customers.types';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { CustomerChat } from '../entities/customer-chat.entity';
import { Repository } from 'typeorm';
import { McpClient } from './customers.agent';

@Injectable()
export class CustomersService {
  private readonly mcpClient: McpClient;

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(CustomerChat)
    private readonly customerChatRepository: Repository<CustomerChat>,
    private readonly httpService: HttpService,
  ) {
    this.mcpClient = new McpClient();
  }

  async createCustomer(body: CreateCustomerBody) {
    const newCustomer = this.customerRepository.create(body);
    return this.customerRepository.save(newCustomer);
  }

  async createCustomerChat(customerId: string, body: CreateCustomerChatBody) {
    const { businessId, query } = body;
    const reply = 'REPLY HERE';

    if (reply) {
      const newChat = this.customerChatRepository.create({
        customerId,
        businessId,
        query,
        reply,
      });
      return this.customerChatRepository.save(newChat);
    }
  }

  async getCustomerChats(customerId: string, businessId: string) {
    return this.customerChatRepository.find({
      where: { customerId, businessId },
      order: {
        createdAt: 'ASC',
      },
    });
  }
}
