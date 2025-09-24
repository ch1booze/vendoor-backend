import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsUUID, Min } from 'class-validator';

export type CustomerOrderStatus = 'drafted' | 'confirmed' | 'cancelled';

export type BusinessOrderStatus = 'in progress' | 'shipped' | 'completed';

export class OrderItemBody {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class UpsertOrderBody {
  @IsArray()
  items: OrderItemBody[];
}

export class GetOrdersQuery {}

export class UpdateOrderStatusBody {
  status: BusinessOrderStatus;
}
