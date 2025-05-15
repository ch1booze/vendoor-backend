import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersResolver, UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
