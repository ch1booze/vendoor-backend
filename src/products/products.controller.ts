import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './products.dto';
import { Session, VerifySession } from 'supertokens-nestjs';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @VerifySession()
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.productsService.createProduct(dto);
  }

  @Get()
  @VerifySession()
  async getProducts(@Session('userId') userId: string) {
    return await this.productsService.getProducts(userId);
  }

  @Get(':id')
  @VerifySession()
  async getProduct(@Param('id') id: string) {
    return await this.productsService.getProduct(id);
  }
}
