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
import { InvoiceStatus } from '@prisma/client';

export class InvoiceItemDto {
  @IsString()
  @IsUUID('4', { message: 'Invalid product ID' })
  productId: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}

export class UpdateInvoiceDto {
  @IsEnum(InvoiceStatus, { message: 'Invalid invoice status' })
  status: InvoiceStatus;
}

export class AddInvoiceItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}

export class UpdateInvoiceItemDto {
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
