import { Module } from '@nestjs/common';
import { BusinessResolver } from './business.resolver';

@Module({
  providers: [BusinessResolver]
})
export class BusinessModule {}
