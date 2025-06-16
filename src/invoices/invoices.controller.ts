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
  CreateInvoiceDto,
  UpdateInvoiceDto,
  AddInvoiceItemDto,
  UpdateInvoiceItemDto,
} from './invoices.dto';

@Controller('businesses/:businessId/invoices')
@VerifySession()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  async createInvoice(
    @Param('businessId') businessId: string,
    @Body() dto: CreateInvoiceDto,
  ) {
    return await this.invoicesService.createInvoice(businessId, dto);
  }

  @Get()
  async getInvoices(@Param('businessId') businessId: string) {
    return await this.invoicesService.getInvoices(businessId);
  }

  @Get(':id')
  async getInvoice(@Param('id') id: string) {
    return await this.invoicesService.getInvoice(id);
  }

  @Put(':id')
  async updateInvoice(
    @Param('id') id: string,
    @Session('userId') userId: string,
    @Body() dto: UpdateInvoiceDto,
  ) {
    return await this.invoicesService.updateInvoice(id, userId, dto);
  }

  @Delete(':id')
  async deleteInvoice(
    @Param('id') id: string,
    @Session('userId') userId: string,
  ) {
    return await this.invoicesService.deleteInvoice(id, userId);
  }

  @Post(':invoiceId/items')
  async addInvoiceItem(
    @Param('invoiceId') invoiceId: string,
    @Session('userId') userId: string,
    @Body() dto: AddInvoiceItemDto,
  ) {
    return await this.invoicesService.addInvoiceItem(invoiceId, userId, dto);
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
