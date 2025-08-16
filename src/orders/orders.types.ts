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

export class ItemsToOrderBody {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemBody)
  items: OrderItemBody[];
}

export class UpdateOrderBody {
  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsEnum(OrderStatus, { message: 'Invalid order status' })
  status: OrderStatus;
}
