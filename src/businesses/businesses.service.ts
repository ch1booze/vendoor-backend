import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusinessChatBody, CreateBusinessBody } from './businesses.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '../entities/business.entity';
import { BusinessChat } from '../entities/business-chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(BusinessChat)
    private readonly businessChatRepository: Repository<BusinessChat>,
  ) {}

  async createBusiness(userId: string, body: CreateBusinessBody) {
    const newBusiness = this.businessRepository.create({
      userId,
      name: body.name,
      tags: body.tags,
      description: body.description,
      data: body.data,
    });
    return this.businessRepository.save(newBusiness);
  }

  async getBusinesses(userId: string) {
    return this.businessRepository.find({
      where: { userId },
    });
  }

  async getBusiness(businessId: string, userId: string) {
    const business = await this.businessRepository.findOne({
      where: { id: businessId, userId },
    });

    if (!business) {
      throw new NotFoundException(
        `Business with ID "${businessId}" not found or access denied.`,
      );
    }
    return business;
  }

  async createBusinessChat(businessId: string, body: CreateBusinessChatBody) {
    const reply = 'REPLY GOES HERE';
    const newChat = this.businessChatRepository.create({
      businessId,
      query: body.query,
      reply,
    });
    return this.businessChatRepository.save(newChat);
  }

  async getBusinessChats(businessId: string) {
    return this.businessChatRepository.find({
      where: { businessId },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
