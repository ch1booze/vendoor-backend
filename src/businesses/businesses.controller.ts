import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { Role } from 'src/auth/role.decorator';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { RoleGuard } from 'src/auth/role.guard';
import { GetBusinessesQuery } from './businesses.types';

@Controller('businesses')
@Role('customer')
@UseGuards(AuthGuard, RoleGuard)
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Get()
  async getBusinesses(@Query() query: GetBusinessesQuery) {
    return await this.businessesService.getBusinesses(query);
  }

  @Get(':businessId')
  async getBusiness(@Param('businessId') businessId: string) {
    return await this.businessesService.getBusiness(businessId);
  }
}
