import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateProductBody,
  GetProductsQuery,
  UpdateProductBody,
} from './products.types';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  private async verifyBusinessOwnership(businessId: string, userId: string) {
    const business = await this.prisma.business.findFirst({
      where: { id: businessId, userId },
    });

    if (!business) {
      throw new ForbiddenException('You do not have access to this business');
    }

    return business;
  }

  async createProduct(
    businessId: string,
    userId: string,
    body: CreateProductBody,
  ) {
    await this.verifyBusinessOwnership(businessId, userId);

    return await this.prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        unit: body.unit,
        category: body.category,
        business: { connect: { id: businessId } },
      },
    });
  }

  async getProducts(businessId: string, query: GetProductsQuery) {
    return await this.prisma.product.findMany({
      where: {
        businessId,
        isActive: true,
        name: { contains: query.name },
        category: { contains: query.category },
        price: { gte: String(query.priceMin), lte: String(query.priceMax) },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProduct(businessId: string, productId: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        businessId,
        isActive: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateProduct(
    businessId: string,
    productId: string,
    body: UpdateProductBody,
    userId: string,
  ) {
    await this.verifyBusinessOwnership(businessId, userId);

    const existingProduct = await this.prisma.product.findFirst({
      where: {
        id: productId,
        businessId,
        isActive: true,
      },
      include: {
        invoiceItems: true,
      },
    });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    // Check if product has been purchased (has invoice items)
    const hasInvoiceItems = existingProduct.invoiceItems.length > 0;
    if (!hasInvoiceItems) {
      // Product hasn't been used in invoices, safe to update directly
      const updatedProduct = await this.prisma.product.update({
        where: { id: productId },
        data: {
          name: body.name ?? existingProduct.name,
          description: body.description ?? existingProduct.description,
          price: body.price ?? existingProduct.price,
          unit: body.unit ?? existingProduct.unit,
          category: body.category ?? existingProduct.category,
        },
      });

      return {
        product: updatedProduct,
        wasCloned: false,
        message: 'Product updated successfully',
      };
    } else {
      // Product has been used, create a new version and deactivate the old one
      const [newProduct] = await this.prisma.$transaction([
        this.prisma.product.create({
          data: {
            name: body.name ?? existingProduct.name,
            description: body.description ?? existingProduct.description,
            price: body.price ?? existingProduct.price,
            unit: body.unit ?? existingProduct.unit,
            category: body.category ?? existingProduct.category,
            business: { connect: { id: businessId } },
          },
        }),

        // Deactivate the old product (don't delete to preserve invoice history)
        this.prisma.product.update({
          where: { id: productId },
          data: { isActive: false },
        }),
      ]);

      return {
        product: newProduct,
        wasCloned: true,
        message:
          'Product has been used in invoices. A new version has been created.',
      };
    }
  }

  async deleteProduct(businessId: string, productId: string, userId: string) {
    await this.verifyBusinessOwnership(businessId, userId);

    return await this.prisma.$transaction(async (tx) => {
      const existingProduct = await tx.product.findUnique({
        where: { id: productId },
        include: {
          invoiceItems: true,
        },
      });

      if (!existingProduct) {
        throw new NotFoundException('Product not found');
      }

      if (existingProduct.invoiceItems.length > 0) {
        return await tx.product.update({
          where: { id: productId },
          data: { isActive: false },
        });
      } else {
        return await tx.product.delete({
          where: { id: productId },
        });
      }
    });
  }
}
