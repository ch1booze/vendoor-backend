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
import { Session, VerifySession } from 'supertokens-nestjs';
import { ProductsService } from './products.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@ApiParam({ name: 'businessId', description: 'The ID of the business' })
@Controller('businesses/:businessId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product for a business' })
  @ApiBody({ type: CreateProductBody })
  @VerifySession()
  async createProduct(
    @Param('businessId') businessId: string,
    @Session('userId') userId: string,
    @Body() body: CreateProductBody,
  ) {
    return await this.productsService.createProduct(businessId, userId, body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products for a business' })
  async getProducts(
    @Param('businessId') businessId: string,
    @Query() query: GetProductsQuery,
  ) {
    return await this.productsService.getProducts(businessId, query);
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get a specific product by its ID' })
  @ApiParam({ name: 'productId', description: 'The ID of the product' })
  async getProduct(
    @Param('businessId') businessId: string,
    @Param('productId') productId: string,
  ) {
    return await this.productsService.getProduct(businessId, productId);
  }

  @Put(':productId')
  @ApiOperation({ summary: 'Update a specific product' })
  @ApiParam({ name: 'productId', description: 'The ID of the product' })
  @ApiBody({ type: UpdateProductBody })
  @VerifySession()
  async updateProduct(
    @Param('businessId') businessId: string,
    @Param('productId') productId: string,
    @Body() body: UpdateProductBody,
    @Session('userId') userId: string,
  ) {
    return await this.productsService.updateProduct(
      businessId,
      productId,
      body,
      userId,
    );
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Delete a specific product' })
  @ApiParam({ name: 'productId', description: 'The ID of the product' })
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
