import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateBusinessChatBody, CreateBusinessBody } from './businesses.types';
import { BusinessesService } from './businesses.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { User } from 'src/auth/user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @ApiOperation({ summary: 'Create a new business for the authenticated user' })
  @ApiBody({ type: CreateBusinessBody })
  @Post()
  async createBusiness(
    @User('sub') userId: string,
    @Body() body: CreateBusinessBody,
  ) {
    return await this.businessesService.createBusiness(userId, body);
  }

  @ApiOperation({
    summary: 'Get the business associated with the authenticated user',
  })
  @UseGuards(AuthGuard)
  @Get()
  async getBusinesses(@User('sub') userId: string) {
    return await this.businessesService.getBusinesses(userId);
  }

  @ApiOperation({
    summary: 'Get the business associated with the authenticated user',
  })
  @UseGuards(AuthGuard)
  @Get(':businessId')
  async getBusiness(
    @User('sub') userId: string,
    @Param('businessId') businessId: string,
  ) {
    return await this.businessesService.getBusiness(businessId, userId);
  }

  @UseGuards(AuthGuard)
  @Post(':businessId/chats')
  async createBusinessChat(
    @Param('businessId') businessId: string,
    @Body() body: CreateBusinessChatBody,
  ) {
    return await this.businessesService.createBusinessChat(businessId, body);
  }

  @UseGuards(AuthGuard)
  @Get(':businessId/chats')
  async getBusinessChats(@Param('businessId') businessId: string) {
    return await this.businessesService.getBusinessChats(businessId);
  }
}
