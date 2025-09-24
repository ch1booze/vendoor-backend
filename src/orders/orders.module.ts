import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BusinessOrdersController } from './business-order.controller';
import { CustomerOrdersController } from './customer-orders.controller';
import { BusinessOrdersService } from './business-orders.service';
import { CustomerOrdersService } from './customer-orders.service';

@Module({
  imports: [PrismaModule],
  controllers: [BusinessOrdersController, CustomerOrdersController],
  providers: [BusinessOrdersService, CustomerOrdersService],
})
export class OrdersModule {}
