import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProductsQuery } from './products.types';

@Injectable()
export class CustomerProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(
    businessId: string,
    { name, category, priceMin, priceMax }: GetProductsQuery,
  ) {
    return await this.prisma.product.findMany({
      where: {
        businessId,
        name: { contains: name, mode: 'insensitive' },
        category: { contains: category, mode: 'insensitive' },
        price: { gte: priceMin, lte: priceMax },
      },
    });
  }

  async getProduct(businessId: string, productId: string) {
    return await this.prisma.product.findUnique({
      where: {
        id: productId,
        businessId,
      },
    });
  }
}
