import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @IsObject()
  workingHours?: Record<string, unknown>;
}

export class CreateBusinessChatDto {
  @ApiProperty()
  @IsString()
  query: string;
}
