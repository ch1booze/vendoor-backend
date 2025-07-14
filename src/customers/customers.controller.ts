import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerChatBody, CreateCustomerBody } from './customers.types';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Customer } from 'src/entities/customer.entity';
import { CustomerChat } from 'src/entities/customer-chat.entity';

@UseGuards(AuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({
    operationId: 'createCustomer',
    summary: 'Create a new customer for the authenticated user',
  })
  @ApiBody({ type: CreateCustomerBody })
  @ApiResponse({
    status: 201,
    description: 'Customer successfully created',
    type: Customer,
  })
  @Post()
  async createCustomer(@Body() createCustomerBody: CreateCustomerBody) {
    return this.customersService.createCustomer(createCustomerBody);
  }

  @ApiOperation({
    operationId: 'createCustomerChat',
    summary: 'Create a new chat for a customer',
  })
  @ApiBody({ type: CreateCustomerChatBody })
  @ApiResponse({
    status: 201,
    description: 'Customer chat successfully created',
    type: CustomerChat,
  })
  @Post(':customerId/chats')
  async createCustomerChat(
    @Param('customerId') customerId: string,
    @Body() body: CreateCustomerChatBody,
  ) {
    return this.customersService.createCustomerChat(customerId, body);
  }

  @ApiOperation({
    operationId: 'getCustomerChats',
    summary: 'Get all chats for a specific customer and business',
  })
  @ApiParam({
    name: 'customerId',
    description: 'The unique identifier of the customer',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'List of customer chats',
    type: [CustomerChat],
  })
  @Get(':customerId/chats')
  async getCustomerChats(
    @Param('customerId') customerId: string,
    @Query('businessId') businessId: string,
  ) {
    return await this.customersService.getCustomerChats(customerId, businessId);
  }
}
