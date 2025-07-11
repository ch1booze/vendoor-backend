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

@ApiTags('Invoices')
@ApiParam({ name: 'businessId', description: 'The ID of the business' })
@UseGuards(AuthGuard)
@Controller('businesses/:businessId/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @ApiOperation({ summary: 'Create a new blank invoice' })
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

  @ApiOperation({ summary: "Update an invoice's details" })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiBody({ type: UpdateInvoiceBody })
  @Post(':invoiceId')
  async updateInvoice(
    @User('sub') userId: string,
    @Param('invoiceId') invoiceId: string,
    @Body() body: UpdateInvoiceBody,
  ) {
    return await this.invoicesService.updateInvoice(invoiceId, userId, body);
  }

  @ApiOperation({ summary: 'Get all invoices for a business' })
  @Get()
  async getInvoices(@Param('businessId') businessId: string) {
    return await this.invoicesService.getInvoices(businessId);
  }

  @Get(':invoiceId')
  @ApiOperation({ summary: 'Get a specific invoice by its ID' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  async getInvoice(@Param('invoiceId') invoiceId: string) {
    return await this.invoicesService.getInvoice(invoiceId);
  }

  @ApiOperation({ summary: 'Delete a specific invoice' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @Delete(':invoiceId')
  async deleteInvoice(
    @User('sub') userId: string,
    @Param('invoiceId') invoiceId: string,
  ) {
    return await this.invoicesService.deleteInvoice(invoiceId, userId);
  }

  @ApiOperation({ summary: 'Add one or more items to an invoice' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiBody({ type: AddInvoiceItemsBody })
  @Post(':invoiceId/items')
  async addInvoiceItems(
    @User('sub') userId: string,
    @Param('invoiceId') invoiceId: string,
    @Body() body: AddInvoiceItemsBody,
  ) {
    return await this.invoicesService.addInvoiceItems(invoiceId, userId, body);
  }

  @ApiOperation({ summary: 'Get all items for a specific invoice' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @Get(':invoiceId/items')
  async getInvoiceItems(
    @User('sub') userId: string,
    @Param('invoiceId') invoiceId: string,
  ) {
    return await this.invoicesService.getInvoiceItems(invoiceId, userId);
  }

  @ApiOperation({ summary: 'Update a specific item on an invoice' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiParam({ name: 'itemId', description: 'The ID of the invoice item' })
  @ApiBody({ type: UpdateInvoiceItemBody })
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

  @ApiOperation({ summary: 'Remove a specific item from an invoice' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiParam({ name: 'itemId', description: 'The ID of the invoice item' })
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
