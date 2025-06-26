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

export enum InvoiceStatus {
  DRAFTED = 'drafted',
  ISSUED = 'issued',
  RECONCILED = 'reconciled',
}

export class InvoiceItemDto {
  @ApiProperty()
  @IsString()
  @IsUUID('4', { message: 'Invalid product ID' })
  productId: string;

  @ApiProperty()
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}

export class UpdateInvoiceDto {
  @ApiProperty()
  @IsEnum(InvoiceStatus, { message: 'Invalid invoice status' })
  status: InvoiceStatus;
}

export class AddInvoiceItemsDto {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}

export class UpdateInvoiceItemDto {
  @ApiProperty()
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
