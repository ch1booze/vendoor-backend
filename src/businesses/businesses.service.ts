import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBusinessesQuery } from './businesses.types';

@Injectable()
export class BusinessesService {
  constructor(private readonly prisma: PrismaService) {}

  async getBusinesses({ name, tags }: GetBusinessesQuery) {
    return await this.prisma.business.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        tags: { hasSome: tags },
      },
    });
  }

  async getBusiness(businessId: string) {
    return await this.prisma.business.findUnique({ where: { id: businessId } });
  }
}
