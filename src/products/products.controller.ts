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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@ApiParam({ name: 'businessId', description: 'The ID of the business' })
@Controller('businesses/:businessId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product for a business' })
  @ApiBody({ type: CreateProductDto })
  @VerifySession()
  async createProduct(
    @Param('businessId') businessId: string,
    @Session('userId') userId: string,
    @Body() dto: CreateProductDto,
  ) {
    return await this.productsService.createProduct(businessId, userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products for a business' })
  async getProducts(@Param('businessId') businessId: string) {
    return await this.productsService.getProducts(businessId);
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
  @ApiBody({ type: UpdateProductDto })
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
