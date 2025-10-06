import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBusinessesQuery } from './businesses.types';

@Injectable()
export class BusinessesService {
  constructor(private readonly prisma: PrismaService) {}

  async getBusinesses({ name, tags }: GetBusinessesQuery, skip = 0, take = 20) {
    const where: Prisma.BusinessWhereInput = {};

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (tags && tags.length > 0) {
      where.tags = { hasSome: tags };
    }

    return await this.prisma.business.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBusiness(businessId: string) {
    return await this.prisma.business.findUniqueOrThrow({
      where: { id: businessId },
    });
  }
}
