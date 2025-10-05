import { Injectable } from '@nestjs/common';
import {
  CreateProductBody,
  GetProductsQuery,
  InventoryEvent,
  UpdateProductBody,
} from './products.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BusinessProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(userId: string, body: CreateProductBody) {
    return await this.prisma.product.create({
      data: { ...body, business: { connect: { userId } } },
    });
  }

  async getProducts(
    userId: string,
    { name, priceMin, priceMax }: GetProductsQuery,
  ) {
    return await this.prisma.product.findMany({
      where: {
        business: { userId },
        name: { contains: name, mode: 'insensitive' },
        price: { gte: priceMin, lte: priceMax },
      },
    });
  }

  async getProduct(userId: string, productId: string) {
    return await this.prisma.product.findUnique({
      where: {
        id: productId,
        business: { userId },
      },
    });
  }

  async updateProduct(
    userId: string,
    productId: string,
    body: UpdateProductBody,
  ) {
    return await this.prisma.product.update({
      where: { id: productId, business: { userId } },
      data: body,
    });
  }

  async updateProductStock(userId: string, productId: string, stock: number) {
    const event: InventoryEvent = 'restock';
    return await this.prisma.product.update({
      where: { id: productId, business: { userId } },
      data: {
        stock,
        inventory: { create: { delta: stock, event } },
      },
    });
  }

  async deleteProduct(userId: string, productId: string) {
    return await this.prisma.product.delete({
      where: {
        id: productId,
        business: { userId },
      },
    });
  }
}
