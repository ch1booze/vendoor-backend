import { IsString, IsOptional, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @MinLength(1, { message: 'Name is required' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @MinLength(1, { message: 'Price is required' })
  price: string;

  @IsString()
  @MinLength(1, { message: 'Unit is required' })
  unit: string;

  @IsString()
  @MinLength(1, { message: 'Category is required' })
  category: string;

  @IsOptional()
  @Type(() => Object)
  data?: Record<string, unknown> | null;
}

export class UpdateProductDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  price?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  unit?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  category?: string;

  @IsOptional()
  @Type(() => Object)
  data?: Record<string, unknown> | null;
}
