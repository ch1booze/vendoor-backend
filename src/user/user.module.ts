import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [UserResolver],
})
export class UserModule {}
