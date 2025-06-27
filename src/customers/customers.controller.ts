import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerChatDto, CreateCustomerDto } from './customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Post(':customerId/chats')
  async createCustomerChat(
    @Param('customerId') customerId: string,
    @Body() dto: CreateCustomerChatDto,
  ) {
    return this.customersService.createCustomerChat(customerId, dto);
  }

  @Get(':customerId/chats')
  async getCustomerChats(
    @Param('customerId') customerId: string,
    @Query('businessId') businessId: string,
  ) {
    return await this.customersService.getCustomerChats(customerId, businessId);
  }
}
