import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBusinessChatDto, CreateBusinessDto } from './businesses.dto';
import { Session, VerifySession } from 'supertokens-nestjs';
import { BusinessesService } from './businesses.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new business for the authenticated user' })
  @ApiBody({ type: CreateBusinessDto })
  @VerifySession()
  async createBusiness(
    @Session('userId') userId: string,
    @Body() dto: CreateBusinessDto,
  ) {
    return await this.businessesService.createBusiness(userId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get the business associated with the authenticated user',
  })
  @VerifySession()
  async getBusiness(@Session('userId') userId: string) {
    return await this.businessesService.getBusiness(userId);
  }

  @Post(':businessId/chats')
  @VerifySession()
  async createBusinessChat(
    @Param('businessId') businessId: string,
    @Body() dto: CreateBusinessChatDto,
  ) {
    return await this.businessesService.createBusinessChat(businessId, dto);
  }
}
