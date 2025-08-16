import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class SignupBusinessOwnerBody {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class VerifyBusinessOwnerBody {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class LoginBusinessOwnerBody {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class OnboardCustomerBody {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  platform: string;
}

export class VerifyCustomerBody {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
