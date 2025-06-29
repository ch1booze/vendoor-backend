import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty()
  @IsString()
  userId: string;

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
  data?: Record<string, unknown>;
}

export class CreateBusinessChatDto {
  @ApiProperty()
  @IsString()
  query: string;
}

export enum BusinessTag {
  BAKERY = 'bakery',
  BARBERSHOP = 'barbershop',
  BOOKSTORE = 'bookstore',
  BOUTIQUE = 'boutique',
  CAFE = 'cafe',
  CATERING = 'catering',
  CLEANING = 'cleaning',
  CLOTHING = 'clothing',
  CONSULTING = 'consulting',
  E_COMMERCE = 'e_commerce',
  EVENT_PLANNING = 'event_planning',
  FITNESS = 'fitness',
  FLORIST = 'florist',
  FOOD_TRUCK = 'food_truck',
  GROCERY = 'grocery',
  GYM = 'gym',
  HOME_IMPROVEMENT = 'home_improvement',
  LAUNDRY = 'laundry',
  PET_SERVICES = 'pet_services',
  PHARMACY = 'pharmacy',
  PHOTOGRAPHY = 'photography',
  REPAIR = 'repair',
  RESTAURANT = 'restaurant',
  RETAIL = 'retail',
  SALON = 'salon',
  SPA = 'spa',
  TAILORING = 'tailoring',
  TUTORING = 'tutoring',
}
