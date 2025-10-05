import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateBusinessBody {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  tags: BusinessTag[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  data?: object;
}

export class UpdateBusinessBody {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  tags?: BusinessTag[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  data?: object;
}

export class CreateBusinessChatBody {
  @ApiProperty()
  @IsString()
  query: string;
}

export type BusinessTag =
  | 'bakery'
  | 'barbershop'
  | 'bookstore'
  | 'boutique'
  | 'cafe'
  | 'catering'
  | 'cleaning'
  | 'clothing'
  | 'consulting'
  | 'e_commerce'
  | 'event_planning'
  | 'fitness'
  | 'florist'
  | 'food_truck'
  | 'grocery'
  | 'gym'
  | 'home_improvement'
  | 'laundry'
  | 'pet_services'
  | 'pharmacy'
  | 'photography'
  | 'repair'
  | 'restaurant'
  | 'retail'
  | 'salon'
  | 'spa'
  | 'tailoring'
  | 'tutoring';
