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

export enum Intent {
  INVOICE_CREATE = 'INVOICE_CREATE',
  INVOICE_PAY = 'INVOICE_PAY',
  INVOICE_CANCEL = 'INVOICE_CANCEL',
}

export class InputEvent {
  intent?: Intent;
}

export const INTENT_EXTRACTION_PROMPT =
  'Extract the intent from the following text: ';

export const REPLY_GENERATION_PROMPT =
  'Generate a reply to the following query: ';
