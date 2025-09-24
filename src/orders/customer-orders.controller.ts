import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/auth/role.decorator';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { RoleGuard } from 'src/auth/role.guard';
import { CustomerOrdersService } from './customer-orders.service';
import { UpsertOrderBody, GetOrdersQuery } from './orders.types';

@Controller('businesses/:businessId/orders')
@Role('customer')
@UseGuards(AuthGuard, RoleGuard)
export class CustomerOrdersController {
  constructor(private readonly ordersService: CustomerOrdersService) {}

  @Post()
  async createOrder(
    @Session() session: UserSession,
    @Param('businessId') businessId: string,
    @Body() body: UpsertOrderBody,
  ) {
    return await this.ordersService.createOrder(
      session.user.id,
      businessId,
      body,
    );
  }

  @Get()
  async getOrders(
    @Session() session: UserSession,
    @Param('businessId') businessId: string,
    @Query() query: GetOrdersQuery,
  ) {
    return await this.ordersService.getOrders(
      session.user.id,
      businessId,
      query,
    );
  }

  @Get(':orderId')
  async getOrder(
    @Session() session: UserSession,
    @Param('businessId') businessId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.ordersService.getOrder(
      session.user.id,
      businessId,
      orderId,
    );
  }

  @Put(':orderId')
  async updateOrder(
    @Session() session: UserSession,
    @Param('businessId') businessId: string,
    @Param('orderId') orderId: string,
    @Body() body: UpsertOrderBody,
  ) {
    return await this.ordersService.updateOrder(
      session.user.id,
      businessId,
      orderId,
      body,
    );
  }

  @Put(':orderId')
  async confirmOrder(
    @Session() session: UserSession,
    @Param('businessId') businessId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.ordersService.confirmOrder(
      session.user.id,
      businessId,
      orderId,
    );
  }

  @Delete(':orderId')
  async cancelOrder(
    @Session() session: UserSession,
    @Param('businessId') businessId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.ordersService.cancelOrder(
      session.user.id,
      businessId,
      orderId,
    );
  }
}
