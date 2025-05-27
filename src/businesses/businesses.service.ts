import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBusinessDto } from './businesses.dto';

@Injectable()
export class BusinessesService {
  constructor(private readonly prisma: PrismaService) {}

  async createBusiness(userId: string, dto: CreateBusinessDto) {
    await this.prisma.business.create({
      data: {
        user: { connect: { id: userId } },
        name: dto.name,
        type: dto.type,
        description: dto.description,
      },
    });

    return true;
  }
}
