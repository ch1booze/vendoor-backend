import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { Session, VerifySession } from 'supertokens-nestjs';
import { ProductsService } from './products.service';

@Controller('businesses/:businessId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @VerifySession()
  async createProduct(
    @Param('businessId') businessId: string,
    @Session('userId') userId: string,
    @Body() dto: CreateProductDto,
  ) {
    return await this.productsService.createProduct(businessId, userId, dto);
  }

  @Get()
  @VerifySession()
  async getProducts(
    @Param('businessId') businessId: string,
    @Session('userId') userId: string,
  ) {
    return await this.productsService.getProducts(businessId, userId);
  }

  @Get(':productId')
  @VerifySession()
  async getProduct(
    @Param('businessId') businessId: string,
    @Param('productId') productId: string,
    @Session('userId') userId: string,
  ) {
    return await this.productsService.getProduct(businessId, productId, userId);
  }

  @Put(':productId')
  @VerifySession()
  async updateProduct(
    @Param('businessId') businessId: string,
    @Param('productId') productId: string,
    @Body() dto: UpdateProductDto,
    @Session('userId') userId: string,
  ) {
    return await this.productsService.updateProduct(
      businessId,
      productId,
      dto,
      userId,
    );
  }

  @Delete(':productId')
  @VerifySession()
  async deleteProduct(
    @Param('businessId') businessId: string,
    @Param('productId') productId: string,
    @Session('userId') userId: string,
  ) {
    return await this.productsService.deleteProduct(
      businessId,
      productId,
      userId,
    );
  }
}
