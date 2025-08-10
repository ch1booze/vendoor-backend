import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  AddOrderItemsBody,
  UpdateOrderBody,
  UpdateOrderItemBody,
} from './orders.types';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/user.decorator';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/order-item.entity';

@ApiTags('Orders')
@ApiParam({ name: 'businessId', description: 'The ID of the business' })
@UseGuards(AuthGuard)
@Controller('businesses/:businessId/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiTags('Customer-Agent')
  @ApiOperation({
    operationId: 'createOrder',
    summary: 'Create a new blank order',
  })
  @ApiParam({
    name: 'businessId',
    description: 'The ID of the business to create the order for',
    type: String,
  })
  @ApiResponse({
    status: 201,
    description: 'Order successfully created',
    type: Order,
  })
  @Post()
  @ApiOperation({ summary: 'Create a new blank order' })
  async createOrder(@Param('businessId') businessId: string) {
    return await this.ordersService.createOrder(businessId);
  }

  @ApiTags('Customer-Agent')
  @ApiOperation({
    operationId: 'updateOrder',
    summary: "Update an order's details",
  })
  @ApiParam({ name: 'orderId', description: 'The ID of the order' })
  @ApiBody({ type: UpdateOrderBody })
  @ApiResponse({
    status: 200,
    description: 'Order successfully updated',
    type: Order,
  })
  @Put(':orderId')
  async updateOrder(
    @User('sub') userId: string,
    @Param('orderId') orderId: string,
    @Body() body: UpdateOrderBody,
  ) {
    return await this.ordersService.updateOrder(orderId, userId, body);
  }

  @ApiOperation({
    operationId: 'getOrders',
    summary: 'Get all orders for a business',
  })
  @ApiResponse({
    status: 200,
    description: 'Orders successfully retrieved',
    type: [Order],
  })
  @Get()
  async getOrders(@Param('businessId') businessId: string) {
    return await this.ordersService.getOrders(businessId);
  }

  @ApiOperation({
    operationId: 'getOrder',
    summary: 'Get a specific order by its ID',
  })
  @ApiParam({ name: 'orderId', description: 'The ID of the order' })
  @ApiResponse({
    status: 200,
    description: 'Order successfully retrieved',
    type: Order,
  })
  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: string) {
    return await this.ordersService.getOrder(orderId);
  }

  @ApiOperation({
    operationId: 'deleteOrder',
    summary: 'Delete a specific order',
  })
  @ApiParam({ name: 'orderId', description: 'The ID of the order' })
  @ApiResponse({
    status: 204,
    description: 'Order successfully deleted',
    type: Order,
  })
  @Delete(':orderId')
  async deleteOrder(
    @User('sub') userId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.ordersService.deleteOrder(orderId, userId);
  }

  @ApiOperation({
    operationId: 'addOrderItems',
    summary: 'Add one or more items to an order',
  })
  @ApiParam({ name: 'orderId', description: 'The ID of the order' })
  @ApiBody({ type: AddOrderItemsBody })
  @ApiResponse({
    status: 201,
    description: 'Order items successfully added',
    type: [OrderItem],
  })
  @UseGuards(AuthGuard)
  @Post(':orderId/items')
  async addOrderItems(
    @User('sub') userId: string,
    @Param('orderId') orderId: string,
    @Body() body: AddOrderItemsBody,
  ) {
    return await this.ordersService.addOrderItems(orderId, userId, body);
  }

  @ApiOperation({
    operationId: 'getOrderItems',
    summary: 'Get all items for a specific order',
  })
  @ApiParam({ name: 'orderId', description: 'The ID of the order' })
  @ApiResponse({
    status: 200,
    description: 'Order items successfully retrieved',
    type: [OrderItem],
  })
  @Get(':orderId/items')
  async getOrderItems(
    @User('sub') userId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.ordersService.getOrderItems(orderId, userId);
  }

  @ApiOperation({
    operationId: 'updateOrderItem',
    summary: 'Update a specific item on an order',
  })
  @ApiParam({ name: 'orderId', description: 'The ID of the order' })
  @ApiParam({ name: 'itemId', description: 'The ID of the order item' })
  @ApiBody({ type: UpdateOrderItemBody })
  @ApiResponse({
    status: 200,
    description: 'Order item successfully updated',
    type: OrderItem,
  })
  @Put(':orderId/items/:itemId')
  async updateOrderItem(
    @User('sub') userId: string,
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string,
    @Body() body: UpdateOrderItemBody,
  ) {
    return await this.ordersService.updateOrderItem(
      orderId,
      itemId,
      userId,
      body,
    );
  }

  @ApiOperation({
    operationId: 'removeOrderItem',
    summary: 'Remove a specific item from an order',
  })
  @ApiParam({ name: 'orderId', description: 'The ID of the order' })
  @ApiParam({ name: 'itemId', description: 'The ID of the order item' })
  @ApiResponse({
    status: 204,
    description: 'Order item successfully removed',
    type: OrderItem,
  })
  @Delete(':orderId/items/:itemId')
  async removeOrderItem(
    @User('sub') userId: string,
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string,
  ) {
    return await this.ordersService.removeOrderItem(
      orderId,
      itemId,
      userId,
    );
  }
}
