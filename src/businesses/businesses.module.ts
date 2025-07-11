import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from 'src/entities/business.entity';
import { BusinessChat } from 'src/entities/business-chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business, BusinessChat])],
  providers: [BusinessesService],
  controllers: [BusinessesController],
})
export class BusinessesModule {}
