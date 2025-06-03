import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ModelModule } from 'src/model/model.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [ModelModule],
})
export class PaymentsModule {}
