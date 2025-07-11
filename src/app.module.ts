import { Module } from '@nestjs/common';
import { BusinessesModule } from './businesses/businesses.module';
import { ProductsModule } from './products/products.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './environment';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BusinessesModule,
    ProductsModule,
    InvoicesModule,
    PaymentsModule,
    CustomersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: env.DATABASE_URL,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
