import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class SigninupUserBody {
  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address.' })
  @IsString({ message: 'Email must be a string.' })
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  @IsString({ message: 'Phone number must be a string.' })
  phoneNumber?: string;
}

export class VerifyUserBody {
  @ApiProperty()
  @IsString()
  preAuthSessionId: string;

  @ApiProperty()
  @IsString()
  deviceId: string;

  @ApiProperty()
  @IsNumberString()
  userInputCode: string;
}

export class UpdateUserBody {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;
}
