import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupUserBody {
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
export class LoginUserBody {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
