import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
    @Body() dto: CreateProductDto,
    @Session('userId') userId: string,
  ) {
    return await this.productsService.createProduct(businessId, dto, userId);
  }

  @Get()
  @VerifySession()
  async getProducts(
    @Param('businessId') businessId: string,
    @Session('userId') userId: string,
  ) {
    return await this.productsService.getProducts(businessId, userId);
  }

  @Get(':id')
  @VerifySession()
  async getProduct(
    @Param('businessId') businessId: string,
    @Param('id') id: string,
    @Session('userId') userId: string,
  ) {
    return await this.productsService.getProduct(businessId, id, userId);
  }

  @Put(':id')
  @VerifySession()
  async updateProduct(
    @Param('businessId') businessId: string,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @Session('userId') userId: string,
  ) {
    return await this.productsService.updateProduct(
      businessId,
      id,
      dto,
      userId,
    );
  }
}
