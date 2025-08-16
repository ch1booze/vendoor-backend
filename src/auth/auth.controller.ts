import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LoginBusinessOwnerBody,
  OnboardCustomerBody,
  SignupBusinessOwnerBody,
  VerifyBusinessOwnerBody,
  VerifyCustomerBody,
} from './auth.types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('business/signup')
  async signupBusinessOwner(@Body() body: SignupBusinessOwnerBody) {
    return await this.authService.signupBusinessOwner(body);
  }

  @Post('business/login')
  async loginBusinessOwner(@Body() body: LoginBusinessOwnerBody) {
    return await this.authService.loginBusinessOwner(body);
  }

  @Post('business/verify')
  async verifyBusinessOwner(@Body() body: VerifyBusinessOwnerBody) {
    return await this.authService.verifyBusinessOwner(body);
  }

  @Post('customer/onboard')
  async onboardCustomer(@Body() body: OnboardCustomerBody) {
    return await this.authService.onboardCustomer(body);
  }

  @Post('customer/verify')
  async verifyCustomer(@Body() body: VerifyCustomerBody) {
    return await this.authService.verifyCustomer(body);
  }
}
