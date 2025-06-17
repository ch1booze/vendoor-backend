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
  AddInvoiceItemsDto,
  UpdateInvoiceDto,
  UpdateInvoiceItemDto,
} from './invoices.dto';

@Controller('businesses/:businessId/invoices')
@VerifySession()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  async createInvoice(@Param('businessId') businessId: string) {
    return await this.invoicesService.createInvoice(businessId);
  }

  @Post(':invoiceId')
  async updateInvoice(
    @Param('invoiceId') invoiceId: string,
    @Session('userId') userId: string,
    @Body() dto: UpdateInvoiceDto,
  ) {
    return await this.invoicesService.updateInvoice(invoiceId, userId, dto);
  }

  @Get()
  async getInvoices(@Param('businessId') businessId: string) {
    return await this.invoicesService.getInvoices(businessId);
  }

  @Get(':invoiceId')
  async getInvoice(@Param('invoiceId') invoiceId: string) {
    return await this.invoicesService.getInvoice(invoiceId);
  }

  @Delete(':invoiceId')
  async deleteInvoice(
    @Param('invoiceId') invoiceId: string,
    @Session('userId') userId: string,
  ) {
    return await this.invoicesService.deleteInvoice(invoiceId, userId);
  }

  @Post(':invoiceId/items')
  async addInvoiceItems(
    @Param('invoiceId') invoiceId: string,
    @Session('userId') userId: string,
    @Body() dto: AddInvoiceItemsDto,
  ) {
    return await this.invoicesService.addInvoiceItems(invoiceId, userId, dto);
  }

  @Get(':invoiceId/items')
  @VerifySession()
  async getInvoiceItems(
    @Param('invoiceId') invoiceId: string,
    @Session('userId') userId: string,
  ) {
    return await this.invoicesService.getInvoiceItems(invoiceId, userId);
  }

  @Put(':invoiceId/items/:itemId')
  async updateInvoiceItem(
    @Param('invoiceId') invoiceId: string,
    @Param('itemId') itemId: string,
    @Session('userId') userId: string,
    @Body() dto: UpdateInvoiceItemDto,
  ) {
    return await this.invoicesService.updateInvoiceItem(
      invoiceId,
      itemId,
      userId,
      dto,
    );
  }

  @Delete(':invoiceId/items/:itemId')
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
