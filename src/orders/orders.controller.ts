import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { ItemsToOrderBody, UpdateOrderBody } from './orders.types';

@ApiTags('Orders')
@ApiTags('Customer-Agent')
@ApiParam({ name: 'businessId', description: 'The ID of the business' })
@Controller('businesses/:businessId/order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/items')
  async addItemsToOrder(
    @Query('customerId') customerId: string,
    @Body() body: ItemsToOrderBody,
  ) {}

  @Put('/items')
  async removeItemsToOrder(
    @Query('customerId') customerId: string,
    @Body() body: ItemsToOrderBody,
  ) {}

  @Put()
  async updateOrder(
    @Query('customerId') customerId: string,
    @Body() body: UpdateOrderBody,
  ) {}

  @Get('/items')
  async getOrderItems(@Query('customerId') customerId: string) {}

  @Get()
  async getOrders(@Query('customerId') customerId: string) {}
}
