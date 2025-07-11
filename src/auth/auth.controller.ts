import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserBody, SignupUserBody } from './auth.types';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: SignupUserBody })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @Post('signup')
  async signup(@Body() body: SignupUserBody) {
    return await this.authService.signup(body);
  }

  @ApiOperation({ summary: 'Authenticate a user and return tokens' })
  @ApiBody({ type: LoginUserBody })
  @ApiResponse({ status: 200, description: 'User successfully authenticated' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  async login(@Body() body: LoginUserBody) {
    return await this.authService.login(body);
  }
}
