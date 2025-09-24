import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BusinessProductsService } from './business-products.service';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import {
  CreateProductBody,
  GetProductsQuery,
  UpdateProductBody,
} from './products.types';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('business/products')
@Role('businessOwner')
@UseGuards(AuthGuard, RoleGuard)
export class BusinessProductsController {
  constructor(private readonly productsService: BusinessProductsService) {}

  @Post()
  async createProduct(
    @Session() session: UserSession,
    @Body() body: CreateProductBody,
  ) {
    return await this.productsService.createProduct(session.user.id, body);
  }

  @Get()
  async getProducts(
    @Session() session: UserSession,
    @Query() query: GetProductsQuery,
  ) {
    return await this.productsService.getProducts(session.user.id, query);
  }

  @Get(':productId')
  async getProduct(
    @Session() session: UserSession,
    @Param('productId') productId: string,
  ) {
    return await this.productsService.getProduct(session.user.id, productId);
  }

  @Put(':productId')
  async updateProduct(
    @Session() session: UserSession,
    @Param('productId') productId: string,
    @Body() body: UpdateProductBody,
  ) {
    return await this.productsService.updateProduct(
      session.user.id,
      productId,
      body,
    );
  }

  @Delete(':productId')
  async deleteProduct(
    @Session() session: UserSession,
    @Param('productId') productId: string,
  ) {
    return await this.productsService.deleteProduct(session.user.id, productId);
  }
}
