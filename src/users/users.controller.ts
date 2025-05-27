import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SigninupUserDto, UpdateUserDto, VerifyUserDto } from './users.dto';
import { Session, VerifySession } from 'supertokens-nestjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signinup')
  async signinupUser(@Body() dto: SigninupUserDto) {
    return await this.usersService.signinupUser(dto);
  }

  @Post('verify')
  async verifyUser(@Body() dto: VerifyUserDto) {
    return await this.usersService.verifyUser(dto);
  }

  @Post('update')
  @VerifySession()
  async updateUser(
    @Session('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(userId, dto);
  }

  @Get('me')
  @VerifySession()
  async getUser(@Session('userId') userId: string) {
    return await this.usersService.getUser(userId);
  }
}
