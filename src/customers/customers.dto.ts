import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';

export enum Platform {
  INSTAGRAM = 'Instagram',
  WHATSAPP = 'WhatsApp',
  EMAIL = 'Email',
}

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  contact: string;

  @ApiProperty()
  @IsEnum(Platform)
  platform: Platform;
}

export class CreateCustomerChatDto {
  @ApiProperty()
  @IsUUID()
  businessId: string;

  @ApiProperty()
  @IsString()
  query: string;
}
