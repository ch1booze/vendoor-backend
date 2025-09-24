import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth';
import { PrismaModule } from './prisma/prisma.module';
import { BusinessModule } from './business/business.module';
import { CustomerModule } from './customer/customer.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { BusinessesModule } from './businesses/businesses.module';

@Module({
  imports: [AuthModule.forRoot(auth), PrismaModule, BusinessModule, CustomerModule, ProductsModule, OrdersModule, BusinessesModule],
})
export class AppModule {}
