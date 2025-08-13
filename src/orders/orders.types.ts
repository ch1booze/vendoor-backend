import {
  IsString,
  IsNumber,
  IsUUID,
  Min,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  DRAFTED = 'drafted',
  ISSUED = 'issued',
  RECONCILED = 'reconciled',
}

export class OrderItemBody {
  @ApiProperty()
  @IsString()
  @IsUUID('4', { message: 'Invalid product ID' })
  productId: string;

  @ApiProperty()
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}

export class UpdateOrderBody {
  @ApiProperty()
  @IsEnum(OrderStatus, { message: 'Invalid order status' })
  status: OrderStatus;
}

export class AddOrderItemsBody {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemBody)
  items: OrderItemBody[];
}

export class UpdateOrderItemBody {
  @ApiProperty()
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}

export enum OrderStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
  RETURNED = 'returned',
}
