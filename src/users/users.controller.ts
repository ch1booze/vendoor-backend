import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SigninupUserDto, UpdateUserDto, VerifyUserDto } from './users.dto';
import { Session, VerifySession } from 'supertokens-nestjs';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signinup')
  @ApiOperation({ summary: 'Sign in or sign up a user with email or phone' })
  @ApiBody({ type: SigninupUserDto })
  async signinupUser(@Body() dto: SigninupUserDto) {
    return await this.usersService.signinupUser(dto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify a user with a one-time code (OTP)' })
  @ApiBody({ type: VerifyUserDto })
  async verifyUser(@Body() dto: VerifyUserDto) {
    return await this.usersService.verifyUser(dto);
  }

  @Post('update')
  @ApiOperation({ summary: "Update the current authenticated user's profile" })
  @ApiBody({ type: UpdateUserDto })
  @VerifySession()
  async updateUser(
    @Session('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(userId, dto);
  }

  @Get('me')
  @ApiOperation({ summary: "Get the current authenticated user's profile" })
  @VerifySession()
  async getUser(@Session('userId') userId: string) {
    return await this.usersService.getUser(userId);
  }
}
