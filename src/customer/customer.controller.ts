import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';
import { CreateCustomerChatBody } from './customer.types';

@Controller('customer')
@Role('customer')
@UseGuards(RoleGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Session() session: UserSession) {
    return await this.customerService.createCustomer(session.user.id);
  }

  @Get()
  async getCustomer(@Session() session: UserSession) {
    return await this.customerService.getCustomer(session.user.id);
  }

  @Post('businesses/:businessId/chats')
  async createCustomerChat(
    @Session() session: UserSession,
    @Param('businessId') businessId: string,
    @Body() body: CreateCustomerChatBody,
  ) {
    return await this.customerService.createCustomerChat(
      session.user.id,
      businessId,
      body,
    );
  }

  @Get('businesses/:businessId/chats')
  async getCustomerChats(
    @Session() session: UserSession,
    @Param('businessId') businessId: string,
  ) {
    return await this.customerService.getCustomerChats(
      session.user.id,
      businessId,
    );
  }
}
