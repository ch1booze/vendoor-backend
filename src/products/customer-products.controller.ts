import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CustomerProductsService } from './customer-products.service';
import { Role } from 'src/auth/role.decorator';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { RoleGuard } from 'src/auth/role.guard';
import { GetProductsQuery } from './products.types';

@Controller('businesses/:businessId/products')
@Role('customer')
@UseGuards(AuthGuard, RoleGuard)
export class CustomerProductsController {
  constructor(private readonly productsService: CustomerProductsService) {}

  @Get()
  async getProducts(
    @Param('businessId') businessId: string,
    @Query() query: GetProductsQuery,
  ) {
    return await this.productsService.getProducts(businessId, query);
  }

  @Get(':productId')
  async getProduct(
    @Param('businessId') businessId: string,
    @Param('productId') productId: string,
  ) {
    return await this.productsService.getProduct(businessId, productId);
  }
}
