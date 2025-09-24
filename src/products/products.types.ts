import {
  IsString,
  IsOptional,
  IsNumber,
  IsObject,
  IsNotEmpty,
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
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  data?: object;
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
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category?: string;
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

  @ApiProperty()
  @IsString()
  @IsOptional()
  category?: string;
}
