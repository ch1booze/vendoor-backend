import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import {
  AddInvoiceItemsBody,
  UpdateInvoiceBody,
  UpdateInvoiceItemBody,
} from './invoices.types';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/user.decorator';
import { Invoice } from 'src/entities/invoice.entity';
import { InvoiceItem } from 'src/entities/invoice-item.entity';

@ApiTags('Invoices')
@ApiParam({ name: 'businessId', description: 'The ID of the business' })
@UseGuards(AuthGuard)
@Controller('businesses/:businessId/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @ApiTags('Customer-Agent')
  @ApiOperation({
    operationId: 'createInvoice',
    summary: 'Create a new blank invoice',
  })
  @ApiParam({
    name: 'businessId',
    description: 'The ID of the business to create the invoice for',
    type: String,
  })
  @ApiResponse({
    status: 201,
    description: 'Invoice successfully created',
    type: Invoice,
  })
  @Post()
  @ApiOperation({ summary: 'Create a new blank invoice' })
  async createInvoice(@Param('businessId') businessId: string) {
    return await this.invoicesService.createInvoice(businessId);
  }

  @ApiTags('Customer-Agent')
  @ApiOperation({
    operationId: 'updateInvoice',
    summary: "Update an invoice's details",
  })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiBody({ type: UpdateInvoiceBody })
  @ApiResponse({
    status: 200,
    description: 'Invoice successfully updated',
    type: Invoice,
  })
  @Put(':invoiceId')
  async updateInvoice(
    @User('sub') userId: string,
    @Param('invoiceId') invoiceId: string,
    @Body() body: UpdateInvoiceBody,
  ) {
    return await this.invoicesService.updateInvoice(invoiceId, userId, body);
  }

  @ApiOperation({
    operationId: 'getInvoices',
    summary: 'Get all invoices for a business',
  })
  @ApiResponse({
    status: 200,
    description: 'Invoices successfully retrieved',
    type: [Invoice],
  })
  @Get()
  async getInvoices(@Param('businessId') businessId: string) {
    return await this.invoicesService.getInvoices(businessId);
  }

  @ApiOperation({
    operationId: 'getInvoice',
    summary: 'Get a specific invoice by its ID',
  })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiResponse({
    status: 200,
    description: 'Invoice successfully retrieved',
    type: Invoice,
  })
  @Get(':invoiceId')
  async getInvoice(@Param('invoiceId') invoiceId: string) {
    return await this.invoicesService.getInvoice(invoiceId);
  }

  @ApiOperation({
    operationId: 'deleteInvoice',
    summary: 'Delete a specific invoice',
  })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiResponse({
    status: 204,
    description: 'Invoice successfully deleted',
    type: Invoice,
  })
  @Delete(':invoiceId')
  async deleteInvoice(
    @User('sub') userId: string,
    @Param('invoiceId') invoiceId: string,
  ) {
    return await this.invoicesService.deleteInvoice(invoiceId, userId);
  }

  @ApiOperation({
    operationId: 'addInvoiceItems',
    summary: 'Add one or more items to an invoice',
  })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiBody({ type: AddInvoiceItemsBody })
  @ApiResponse({
    status: 201,
    description: 'Invoice items successfully added',
    type: [InvoiceItem],
  })
  @UseGuards(AuthGuard)
  @Post(':invoiceId/items')
  async addInvoiceItems(
    @User('sub') userId: string,
    @Param('invoiceId') invoiceId: string,
    @Body() body: AddInvoiceItemsBody,
  ) {
    return await this.invoicesService.addInvoiceItems(invoiceId, userId, body);
  }

  @ApiOperation({
    operationId: 'getInvoiceItems',
    summary: 'Get all items for a specific invoice',
  })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiResponse({
    status: 200,
    description: 'Invoice items successfully retrieved',
    type: [InvoiceItem],
  })
  @Get(':invoiceId/items')
  async getInvoiceItems(
    @User('sub') userId: string,
    @Param('invoiceId') invoiceId: string,
  ) {
    return await this.invoicesService.getInvoiceItems(invoiceId, userId);
  }

  @ApiOperation({
    operationId: 'updateInvoiceItem',
    summary: 'Update a specific item on an invoice',
  })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiParam({ name: 'itemId', description: 'The ID of the invoice item' })
  @ApiBody({ type: UpdateInvoiceItemBody })
  @ApiResponse({
    status: 200,
    description: 'Invoice item successfully updated',
    type: InvoiceItem,
  })
  @Put(':invoiceId/items/:itemId')
  async updateInvoiceItem(
    @User('sub') userId: string,
    @Param('invoiceId') invoiceId: string,
    @Param('itemId') itemId: string,
    @Body() body: UpdateInvoiceItemBody,
  ) {
    return await this.invoicesService.updateInvoiceItem(
      invoiceId,
      itemId,
      userId,
      body,
    );
  }

  @ApiOperation({
    operationId: 'removeInvoiceItem',
    summary: 'Remove a specific item from an invoice',
  })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiParam({ name: 'itemId', description: 'The ID of the invoice item' })
  @ApiResponse({
    status: 204,
    description: 'Invoice item successfully removed',
    type: InvoiceItem,
  })
  @Delete(':invoiceId/items/:itemId')
  async removeInvoiceItem(
    @User('sub') userId: string,
    @Param('invoiceId') invoiceId: string,
    @Param('itemId') itemId: string,
  ) {
    return await this.invoicesService.removeInvoiceItem(
      invoiceId,
      itemId,
      userId,
    );
  }
}
