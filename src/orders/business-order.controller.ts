import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { BusinessOrdersService } from './business-orders.service';
import { GetOrdersQuery, UpdateOrderStatusBody } from './orders.types';

@Controller('business/orders')
@Role('businessOwner')
@UseGuards(AuthGuard, RoleGuard)
export class BusinessOrdersController {
  constructor(private readonly ordersService: BusinessOrdersService) {}

  @Get()
  async getOrders(
    @Session() session: UserSession,
    @Query() query: GetOrdersQuery,
  ) {
    return await this.ordersService.getOrders(session.user.id, query);
  }

  @Get(':orderId')
  async getOrder(
    @Session() session: UserSession,
    @Param('orderId') orderId: string,
  ) {
    return await this.ordersService.getOrder(session.user.id, orderId);
  }

  @Put(':orderId/status')
  async updateOrderStatus(
    @Session() session: UserSession,
    @Param('orderId') orderId: string,
    @Body() body: UpdateOrderStatusBody,
  ) {
    return await this.ordersService.updateOrderStatus(
      session.user.id,
      orderId,
      body,
    );
  }
}
