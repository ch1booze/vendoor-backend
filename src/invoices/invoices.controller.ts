import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Session, VerifySession } from 'supertokens-nestjs';
import { InvoicesService } from './invoices.service';
import {
  AddInvoiceItemsBody,
  UpdateInvoiceBody,
  UpdateInvoiceItemBody,
} from './invoices.types';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Invoices')
@ApiParam({ name: 'businessId', description: 'The ID of the business' })
@Controller('businesses/:businessId/invoices')
@VerifySession()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blank invoice' })
  async createInvoice(@Param('businessId') businessId: string) {
    return await this.invoicesService.createInvoice(businessId);
  }

  @Post(':invoiceId')
  @ApiOperation({ summary: "Update an invoice's details" })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiBody({ type: UpdateInvoiceBody })
  async updateInvoice(
    @Param('invoiceId') invoiceId: string,
    @Session('userId') userId: string,
    @Body() body: UpdateInvoiceBody,
  ) {
    return await this.invoicesService.updateInvoice(invoiceId, userId, body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoices for a business' })
  async getInvoices(@Param('businessId') businessId: string) {
    return await this.invoicesService.getInvoices(businessId);
  }

  @Get(':invoiceId')
  @ApiOperation({ summary: 'Get a specific invoice by its ID' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  async getInvoice(@Param('invoiceId') invoiceId: string) {
    return await this.invoicesService.getInvoice(invoiceId);
  }

  @Delete(':invoiceId')
  @ApiOperation({ summary: 'Delete a specific invoice' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  async deleteInvoice(
    @Param('invoiceId') invoiceId: string,
    @Session('userId') userId: string,
  ) {
    return await this.invoicesService.deleteInvoice(invoiceId, userId);
  }

  @Post(':invoiceId/items')
  @ApiOperation({ summary: 'Add one or more items to an invoice' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiBody({ type: AddInvoiceItemsBody })
  async addInvoiceItems(
    @Param('invoiceId') invoiceId: string,
    @Session('userId') userId: string,
    @Body() body: AddInvoiceItemsBody,
  ) {
    return await this.invoicesService.addInvoiceItems(invoiceId, userId, body);
  }

  @Get(':invoiceId/items')
  @ApiOperation({ summary: 'Get all items for a specific invoice' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @VerifySession()
  async getInvoiceItems(
    @Param('invoiceId') invoiceId: string,
    @Session('userId') userId: string,
  ) {
    return await this.invoicesService.getInvoiceItems(invoiceId, userId);
  }

  @Put(':invoiceId/items/:itemId')
  @ApiOperation({ summary: 'Update a specific item on an invoice' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiParam({ name: 'itemId', description: 'The ID of the invoice item' })
  @ApiBody({ type: UpdateInvoiceItemBody })
  async updateInvoiceItem(
    @Param('invoiceId') invoiceId: string,
    @Param('itemId') itemId: string,
    @Session('userId') userId: string,
    @Body() body: UpdateInvoiceItemBody,
  ) {
    return await this.invoicesService.updateInvoiceItem(
      invoiceId,
      itemId,
      userId,
      body,
    );
  }

  @Delete(':invoiceId/items/:itemId')
  @ApiOperation({ summary: 'Remove a specific item from an invoice' })
  @ApiParam({ name: 'invoiceId', description: 'The ID of the invoice' })
  @ApiParam({ name: 'itemId', description: 'The ID of the invoice item' })
  async removeInvoiceItem(
    @Param('invoiceId') invoiceId: string,
    @Param('itemId') itemId: string,
    @Session('userId') userId: string,
  ) {
    return await this.invoicesService.removeInvoiceItem(
      invoiceId,
      itemId,
      userId,
    );
  }
}
