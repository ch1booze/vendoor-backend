import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  price: bigint;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty()
  @IsArray()
  tags: string[];
}

export class UpdateProductBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: bigint;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  unit?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  tags?: string[];
}

export class GetProductsQuery {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  priceMin?: bigint;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  priceMax?: bigint;
}

export enum InventoryEvent {
  RESTOCK = 'restock',
  SOLD = 'sold',
}
