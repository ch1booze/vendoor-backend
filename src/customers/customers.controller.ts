import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerChatBody, CreateCustomerBody } from './customers.types';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createCustomer(@Body() createCustomerBody: CreateCustomerBody) {
    return this.customersService.createCustomer(createCustomerBody);
  }

  @Post(':customerId/chats')
  async createCustomerChat(
    @Param('customerId') customerId: string,
    @Body() body: CreateCustomerChatBody,
  ) {
    return this.customersService.createCustomerChat(customerId, body);
  }

  @Get(':customerId/chats')
  async getCustomerChats(
    @Param('customerId') customerId: string,
    @Query('businessId') businessId: string,
  ) {
    return await this.customersService.getCustomerChats(customerId, businessId);
  }
}
