import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBusinessChatBody, CreateBusinessBody } from './businesses.types';
import { Prisma } from '@prisma/client';

@Injectable()
export class BusinessesService {
  constructor(private readonly prisma: PrismaService) {}

  async createBusiness(userId: string, body: CreateBusinessBody) {
    return await this.prisma.business.create({
      data: {
        userId,
        name: body.name,
        tags: body.tags,
        description: body.description,
        data: body.data as Prisma.JsonObject,
      },
    });
  }

  async getBusinesses(userId: string) {
    return await this.prisma.business.findMany({ where: { userId } });
  }

  async getBusiness(businessId: string, userId: string) {
    return await this.prisma.business.findUnique({
      where: { id: businessId, userId },
    });
  }

  async createBusinessChat(businessId: string, body: CreateBusinessChatBody) {
    const reply = 'REPLY GOES HERE';
    return await this.prisma.businessChat.create({
      data: { businessId, query: body.query, reply },
    });
  }

  async getBusinessChats(businessId: string) {
    return await this.prisma.businessChat.findMany({
      where: { businessId },
    });
  }
}
