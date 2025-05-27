import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './products.dto';
import { VerifySession } from 'supertokens-nestjs';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @VerifySession()
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.productsService.createProduct(dto);
  }
}
