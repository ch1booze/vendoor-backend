import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  SigninupUserBody,
  UpdateUserBody,
  VerifyUserBody,
} from './users.types';
import { Session, VerifySession } from 'supertokens-nestjs';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signinup')
  @ApiOperation({ summary: 'Sign in or sign up a user with email or phone' })
  @ApiBody({ type: SigninupUserBody })
  async signinupUser(@Body() body: SigninupUserBody) {
    return await this.usersService.signinupUser(body);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify a user with a one-time code (OTP)' })
  @ApiBody({ type: VerifyUserBody })
  async verifyUser(@Body() body: VerifyUserBody) {
    return await this.usersService.verifyUser(body);
  }

  @Post('update')
  @ApiOperation({ summary: "Update the current authenticated user's profile" })
  @ApiBody({ type: UpdateUserBody })
  @VerifySession()
  async updateUser(
    @Session('userId') userId: string,
    @Body() body: UpdateUserBody,
  ) {
    return await this.usersService.updateUser(userId, body);
  }

  @Get('me')
  @ApiOperation({ summary: "Get the current authenticated user's profile" })
  @VerifySession()
  async getUser(@Session('userId') userId: string) {
    return await this.usersService.getUser(userId);
  }
}
