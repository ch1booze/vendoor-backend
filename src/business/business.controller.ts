import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.decorator';
import {
  CreateBusinessBody,
  CreateBusinessChatBody,
  UpdateBusinessBody,
} from './business.types';

@Controller('business')
@Role('businessOwner')
@UseGuards(AuthGuard, RoleGuard)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  async createBusiness(
    @Session() session: UserSession,
    @Body() body: CreateBusinessBody,
  ) {
    return await this.businessService.createBusiness(session.user.id, body);
  }

  @Put()
  async updateBusiness(
    @Session() session: UserSession,
    @Body() body: UpdateBusinessBody,
  ) {
    return await this.businessService.updateBusiness(session.user.id, body);
  }

  @Delete()
  async deleteBusiness(@Session() session: UserSession) {
    return await this.businessService.deleteBusiness(session.user.id);
  }

  @Get()
  async getBusiness(@Session() session: UserSession) {
    return await this.businessService.getBusiness(session.user.id);
  }

  @Post('chats')
  async createBusinessChat(
    @Session() session: UserSession,
    @Body() body: CreateBusinessChatBody,
  ) {
    return await this.businessService.createBusinessChat(session.user.id, body);
  }

  @Get('chats')
  async getBusinessChats(@Session() session: UserSession) {
    return await this.businessService.getBusinessChats(session.user.id);
  }

  @Get('customers')
  async getBusinessCustomers(@Session() session: UserSession) {
    return await this.businessService.getBusinessCustomers(session.user.id);
  }

  @Get('customers/:customerId/chats')
  async getBusinessCustomerChats(
    @Session() session: UserSession,
    @Param('customerId') customerId: string,
  ) {
    return await this.businessService.getBusinessCustomerChats(
      session.user.id,
      customerId,
    );
  }
}
