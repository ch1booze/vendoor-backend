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
    dto: CreateProductDto,
    userId: string,
  ) {
    // Verify user owns the business
    await this.verifyBusinessOwnership(businessId, userId);

    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        unit: dto.unit,
        category: dto.category,
        data: dto.data,
        business: { connect: { id: businessId } },
      },
    });

    return product;
  }

  async getProducts(businessId: string, userId: string) {
    // Verify user owns the business
    await this.verifyBusinessOwnership(businessId, userId);

    return await this.prisma.product.findMany({
      where: {
        businessId,
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProduct(businessId: string, id: string, userId: string) {
    // Verify user owns the business
    await this.verifyBusinessOwnership(businessId, userId);

    const product = await this.prisma.product.findFirst({
      where: {
        id,
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
    id: string,
    dto: UpdateProductDto,
    userId: string,
  ) {
    // Verify user owns the business
    await this.verifyBusinessOwnership(businessId, userId);

    // Get the existing product
    const existingProduct = await this.prisma.product.findFirst({
      where: {
        id,
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

    if (!hasInvoiceItems && !existingProduct.isPurchased) {
      // Product hasn't been used in invoices, safe to update directly
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          name: dto.name ?? existingProduct.name,
          description: dto.description ?? existingProduct.description,
          price: dto.price ?? existingProduct.price,
          unit: dto.unit ?? existingProduct.unit,
          category: dto.category ?? existingProduct.category,
          data: dto.data ?? existingProduct.data,
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
        // Create new product with updated data
        this.prisma.product.create({
          data: {
            name: dto.name ?? existingProduct.name,
            description: dto.description ?? existingProduct.description,
            price: dto.price ?? existingProduct.price,
            unit: dto.unit ?? existingProduct.unit,
            category: dto.category ?? existingProduct.category,
            data: dto.data ?? existingProduct.data,
            business: { connect: { id: businessId } },
          },
        }),
        // Deactivate the old product (don't delete to preserve invoice history)
        this.prisma.product.update({
          where: { id },
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
}
