import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth';
import { PrismaModule } from './prisma/prisma.module';
import { BusinessModule } from './business/business.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [AuthModule.forRoot(auth), PrismaModule, BusinessModule, CustomerModule],
})
export class AppModule {}
