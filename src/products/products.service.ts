import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateProductBody,
  GetProductsQuery,
  UpdateProductBody,
} from './products.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Business } from '../entities/business.entity';
import {
  Repository,
  DataSource,
  FindManyOptions,
  ILike,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    private readonly dataSource: DataSource,
  ) {}

  private async verifyBusinessOwnership(businessId: string, userId: string) {
    const business = await this.businessRepository.findOneBy({
      id: businessId,
      userId,
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

    const newProduct = this.productRepository.create({
      ...body,
      businessId,
    });

    return this.productRepository.save(newProduct);
  }

  async getProducts(businessId: string, query: GetProductsQuery) {
    const where: FindManyOptions<Product>['where'] = {
      businessId,
      isActive: true,
    };

    if (query.name) {
      where.name = ILike(`%${query.name}%`);
    }
    if (query.category) {
      where.category = ILike(`%${query.category}%`);
    }
    if (query.priceMin) {
      where.price = MoreThanOrEqual(String(query.priceMin));
    }
    if (query.priceMax) {
      where.price = LessThanOrEqual(String(query.priceMax));
    }

    return this.productRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async getProduct(businessId: string, productId: string) {
    const product = await this.productRepository.findOneBy({
      id: productId,
      businessId,
      isActive: true,
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

    const existingProduct = await this.productRepository.findOne({
      where: {
        id: productId,
        businessId,
        isActive: true,
      },
      relations: ['invoiceItems'],
    });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    const hasInvoiceItems = existingProduct.invoiceItems.length > 0;
    if (!hasInvoiceItems) {
      const updatedProduct = this.productRepository.merge(
        existingProduct,
        body,
      );
      await this.productRepository.save(updatedProduct);
      return {
        product: updatedProduct,
        wasCloned: false,
        message: 'Product updated successfully',
      };
    } else {
      return this.dataSource.transaction(async (transactionalEntityManager) => {
        const newProductEntity = transactionalEntityManager.create(Product, {
          name: body.name ?? existingProduct.name,
          description: body.description ?? existingProduct.description,
          price: body.price ?? existingProduct.price,
          unit: body.unit ?? existingProduct.unit,
          category: body.category ?? existingProduct.category,
          businessId: businessId,
        });
        const newProduct =
          await transactionalEntityManager.save(newProductEntity);

        await transactionalEntityManager.update(Product, productId, {
          isActive: false,
        });

        return {
          product: newProduct,
          wasCloned: true,
          message:
            'Product has been used in invoices. A new version has been created.',
        };
      });
    }
  }

  async deleteProduct(businessId: string, productId: string, userId: string) {
    await this.verifyBusinessOwnership(businessId, userId);

    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const existingProduct = await transactionalEntityManager.findOne(
        Product,
        {
          where: { id: productId, businessId },
          relations: ['invoiceItems'],
        },
      );

      if (!existingProduct) {
        throw new NotFoundException('Product not found');
      }

      if (existingProduct.invoiceItems.length > 0) {
        await transactionalEntityManager.update(Product, productId, {
          isActive: false,
        });
        return {
          message: 'Product has been deactivated due to usage in invoices.',
        };
      } else {
        await transactionalEntityManager.delete(Product, { id: productId });
        return { message: 'Product deleted successfully.' };
      }
    });
  }
}
