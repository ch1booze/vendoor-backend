import { Module } from '@nestjs/common';
import { BusinessProductsService } from './business-products.service';
import { BusinessProductsController } from './business-products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BusinessProductsController],
  providers: [BusinessProductsService],
})
export class ProductsModule {}
