import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [UsersResolver],
})
export class UsersModule {}
