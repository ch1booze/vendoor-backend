import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { CustomerIntent } from './model/intents';

export enum Platform {
  INSTAGRAM = 'Instagram',
  WHATSAPP = 'WhatsApp',
  EMAIL = 'Email',
}

export class CreateCustomerBody {
  @ApiProperty()
  @IsString()
  contact: string;

  @ApiProperty()
  @IsEnum(Platform)
  platform: Platform;
}

export class CreateCustomerChatBody {
  @ApiProperty()
  @IsUUID()
  businessId: string;

  @ApiProperty()
  @IsString()
  query: string;
}



export type Prompts = Record<CustomerIntent, string>;
