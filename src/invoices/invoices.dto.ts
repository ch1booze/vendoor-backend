import {
  IsString,
  IsNumber,
  IsUUID,
  Min,
  IsArray,
  ValidateNested,
  IsOptional,
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

export class CreateInvoiceDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}

export class UpdateInvoiceDto {
  @IsOptional()
  @IsEnum(InvoiceStatus, { message: 'Invalid invoice status' })
  status?: InvoiceStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items?: InvoiceItemDto[];
}

export class AddInvoiceItemDto {
  @IsString()
  @IsUUID('4', { message: 'Invalid product ID' })
  productId: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}

export class UpdateInvoiceItemDto {
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
