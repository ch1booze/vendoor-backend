import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';

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
    dto: CreateProductDto,
  ) {
    await this.verifyBusinessOwnership(businessId, userId);

    return await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        unit: dto.unit,
        category: dto.category,
        business: { connect: { id: businessId } },
      },
    });
  }

  async getProducts(businessId: string) {
    return await this.prisma.product.findMany({
      where: {
        businessId,
        isActive: true,
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
    dto: UpdateProductDto,
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
          name: dto.name ?? existingProduct.name,
          description: dto.description ?? existingProduct.description,
          price: dto.price ?? existingProduct.price,
          unit: dto.unit ?? existingProduct.unit,
          category: dto.category ?? existingProduct.category,
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
            name: dto.name ?? existingProduct.name,
            description: dto.description ?? existingProduct.description,
            price: dto.price ?? existingProduct.price,
            unit: dto.unit ?? existingProduct.unit,
            category: dto.category ?? existingProduct.category,
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
