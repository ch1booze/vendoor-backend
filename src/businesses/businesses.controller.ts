import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBusinessDto } from './businesses.dto';
import { Session, VerifySession } from 'supertokens-nestjs';
import { BusinessesService } from './businesses.service';

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Post()
  @VerifySession()
  async createBusiness(
    @Session('userId') userId: string,
    @Body() dto: CreateBusinessDto,
  ) {
    return await this.businessesService.createBusiness(userId, dto);
  }

  @Get()
  @VerifySession()
  async getBusiness(@Session('userId') userId: string) {
    return await this.businessesService.getBusiness(userId);
  }
}
