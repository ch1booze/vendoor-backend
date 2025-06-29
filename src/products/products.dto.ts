import { IsString, IsOptional, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(1, { message: 'Name is required' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1, { message: 'Price is required' })
  price: string;

  @ApiProperty()
  @IsString()
  @MinLength(1, { message: 'Unit is required' })
  unit: string;

  @ApiProperty()
  @IsString()
  @MinLength(1, { message: 'Category is required' })
  category: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Object)
  data?: Record<string, unknown> | null;
}

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsOptional()
  price?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsOptional()
  unit?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsOptional()
  category?: string;
}
