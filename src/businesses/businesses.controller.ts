import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateBusinessChatBody, CreateBusinessBody } from './businesses.types';
import { BusinessesService } from './businesses.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { User } from 'src/auth/user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Business } from 'src/entities/business.entity';
import { BusinessChat } from 'src/entities/business-chat.entity';

@ApiTags('Businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @ApiOperation({ summary: 'Create a new business for the authenticated user' })
  @ApiBody({ type: CreateBusinessBody })
  @ApiResponse({
    status: 201,
    description: 'Business successfully created',
    type: Business,
  })
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
  @ApiResponse({
    status: 200,
    description: 'List of businesses for the user',
    type: [Business],
  })
  @UseGuards(AuthGuard)
  @Get()
  async getBusinesses(@User('sub') userId: string) {
    return await this.businessesService.getBusinesses(userId);
  }

  @ApiOperation({
    summary: 'Get the business associated with the authenticated user',
  })
  @ApiParam({
    name: 'businessId',
    description: 'The unique identifier of the business',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Business details',
    type: Business,
  })
  @ApiResponse({ status: 404, description: 'Business not found' })
  @UseGuards(AuthGuard)
  @Get(':businessId')
  async getBusiness(
    @User('sub') userId: string,
    @Param('businessId') businessId: string,
  ) {
    return await this.businessesService.getBusiness(businessId, userId);
  }

  @ApiOperation({
    summary: 'Create a new business chat for a specific business',
  })
  @ApiParam({
    name: 'businessId',
    description: 'The unique identifier of the business',
    type: String,
  })
  @ApiBody({ type: CreateBusinessChatBody })
  @ApiResponse({
    status: 201,
    description: 'Business chat successfully created',
    type: BusinessChat,
  })
  @UseGuards(AuthGuard)
  @Post(':businessId/chats')
  async createBusinessChat(
    @Param('businessId') businessId: string,
    @Body() body: CreateBusinessChatBody,
  ) {
    return await this.businessesService.createBusinessChat(businessId, body);
  }

  @ApiOperation({
    summary: 'Get all business chats for a specific business',
  })
  @ApiParam({
    name: 'businessId',
    description: 'The unique identifier of the business',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'List of business chats for the business',
    type: [BusinessChat],
  })
  @UseGuards(AuthGuard)
  @Get(':businessId/chats')
  async getBusinessChats(@Param('businessId') businessId: string) {
    return await this.businessesService.getBusinessChats(businessId);
  }
}
