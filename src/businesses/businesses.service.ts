import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBusinessChatDto, CreateBusinessDto } from './businesses.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BusinessesService {
  constructor(private readonly prisma: PrismaService) {}

  async createBusiness(userId: string, dto: CreateBusinessDto) {
    return await this.prisma.business.create({
      data: {
        userId,
        name: dto.name,
        tags: dto.tags,
        description: dto.description,
        data: dto.data as Prisma.JsonObject,
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

  async createBusinessChat(businessId: string, dto: CreateBusinessChatDto) {
    const reply = 'REPLY GOES HERE';
    return await this.prisma.businessChat.create({
      data: { businessId, query: dto.query, reply },
    });
  }

  async getBusinessChats(businessId: string) {
    return await this.prisma.businessChat.findMany({
      where: { businessId },
    });
  }
}
