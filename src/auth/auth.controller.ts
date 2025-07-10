import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, SignupUserDto } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signup(@Body() dto: SignupUserDto) {
    return await this.authService.signup(dto);
  }
  async login(@Body() dto: LoginUserDto) {
    return await this.authService.login(dto);
  }
}
