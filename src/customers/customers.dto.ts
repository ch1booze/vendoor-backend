import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { CustomerIntent } from './customers.intents';

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

export class InputEvent {
  intent?: CustomerIntent;
}

export const REPLY_GENERATION_PROMPT =
  'Generate a reply to the following query: ';
