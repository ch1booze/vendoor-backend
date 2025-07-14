import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateProductBody,
  GetProductsQuery,
  UpdateProductBody,
} from './products.types';
import { ProductsService } from './products.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/user.decorator';

@ApiTags('Products')
@ApiParam({ name: 'businessId', description: 'The ID of the business' })
@Controller('businesses/:businessId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a new product for a business' })
  @ApiBody({ type: CreateProductBody })
  @Post()
  async createProduct(
    @User('sub') userId: string,
    @Param('businessId') businessId: string,
    @Body() body: CreateProductBody,
  ) {
    return await this.productsService.createProduct(businessId, userId, body);
  }

  @ApiTags('Customer-Agent')
  @ApiOperation({ summary: 'Get all products for a business' })
  @Get()
  async getProducts(
    @Param('businessId') businessId: string,
    @Query() query: GetProductsQuery,
  ) {
    return await this.productsService.getProducts(businessId, query);
  }

  @ApiTags('Customer-Agent')
  @ApiOperation({ summary: 'Get a specific product by its ID' })
  @ApiParam({ name: 'productId', description: 'The ID of the product' })
  @Get(':productId')
  async getProduct(
    @Param('businessId') businessId: string,
    @Param('productId') productId: string,
  ) {
    return await this.productsService.getProduct(businessId, productId);
  }

  @ApiOperation({ summary: 'Update a specific product' })
  @ApiParam({ name: 'productId', description: 'The ID of the product' })
  @ApiBody({ type: UpdateProductBody })
  @Put(':productId')
  async updateProduct(
    @User('sub') userId: string,
    @Param('businessId') businessId: string,
    @Param('productId') productId: string,
    @Body() body: UpdateProductBody,
  ) {
    return await this.productsService.updateProduct(
      businessId,
      productId,
      body,
      userId,
    );
  }

  @ApiOperation({ summary: 'Delete a specific product' })
  @ApiParam({ name: 'productId', description: 'The ID of the product' })
  @Delete(':productId')
  async deleteProduct(
    @User('sub') userId: string,
    @Param('businessId') businessId: string,
    @Param('productId') productId: string,
  ) {
    return await this.productsService.deleteProduct(
      businessId,
      productId,
      userId,
    );
  }
}
