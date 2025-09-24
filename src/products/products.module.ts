import { Module } from '@nestjs/common';
import { BusinessProductsService } from './business-products.service';
import { BusinessProductsController } from './business-products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomerProductsController } from './customer-products.controller';
import { CustomerProductsService } from './customer-products.service';

@Module({
  imports: [PrismaModule],
  controllers: [BusinessProductsController, CustomerProductsController],
  providers: [BusinessProductsService, CustomerProductsService],
})
export class ProductsModule {}
