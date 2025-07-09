import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBusinessChatBody, CreateBusinessBody } from './businesses.types';
import { BusinessesService } from './businesses.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new business for the authenticated user' })
  @ApiBody({ type: CreateBusinessBody })
  async createBusiness(@Body() body: CreateBusinessBody) {
    return await this.businessesService.createBusiness(userId, body);
  }

  @Get()
  @ApiOperation({
    summary: 'Get the business associated with the authenticated user',
  })
  async getBusinesses() {
    return await this.businessesService.getBusinesses(userId);
  }

  @Get(':businessId')
  @ApiOperation({
    summary: 'Get the business associated with the authenticated user',
  })
  async getBusiness(@Param('businessId') businessId: string) {
    return await this.businessesService.getBusiness(businessId, userId);
  }

  @Post(':businessId/chats')
  async createBusinessChat(
    @Param('businessId') businessId: string,
    @Body() body: CreateBusinessChatBody,
  ) {
    return await this.businessesService.createBusinessChat(businessId, body);
  }

  @Get(':businessId/chats')
  async getBusinessChats(@Param('businessId') businessId: string) {
    return await this.businessesService.getBusinessChats(businessId);
  }
}
