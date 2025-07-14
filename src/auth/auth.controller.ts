import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserBody, LoginUserResponse, SignupUserBody } from './auth.types';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    operationId: 'signup',
    summary: 'Register a new user',
  })
  @ApiBody({ type: SignupUserBody })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @Post('signup')
  async signup(@Body() body: SignupUserBody) {
    return await this.authService.signup(body);
  }

  @ApiOperation({
    operationId: 'login',
    summary: 'Authenticate a user and return tokens',
  })
  @ApiBody({ type: LoginUserBody })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    type: LoginUserResponse,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  async login(@Body() body: LoginUserBody) {
    return await this.authService.login(body);
  }
}
