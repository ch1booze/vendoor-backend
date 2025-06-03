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
  CreateInvoiceSchema,
  UpdateInvoiceSchema,
  AddInvoiceItemSchema,
  UpdateInvoiceItemSchema,
} from './invoices.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @VerifySession()
  async createInvoice(@Body() body: any, @Session('userId') userId: string) {
    const dto = CreateInvoiceSchema.parse(body);
    return await this.invoicesService.createInvoice(dto, userId);
  }

  @Get()
  @VerifySession()
  async getInvoices(@Session('userId') userId: string) {
    return await this.invoicesService.getInvoices(userId);
  }

  @Get(':id')
  @VerifySession()
  async getInvoice(@Param('id') id: string, @Session('userId') userId: string) {
    return await this.invoicesService.getInvoice(id, userId);
  }

  @Put(':id')
  @VerifySession()
  async updateInvoice(
    @Param('id') id: string,
    @Body() body: any,
    @Session('userId') userId: string,
  ) {
    const dto = UpdateInvoiceSchema.parse(body);
    return await this.invoicesService.updateInvoice(id, dto, userId);
  }

  @Delete(':id')
  @VerifySession()
  async deleteInvoice(
    @Param('id') id: string,
    @Session('userId') userId: string,
  ) {
    return await this.invoicesService.deleteInvoice(id, userId);
  }

  // Invoice Items endpoints
  @Post(':invoiceId/items')
  @VerifySession()
  async addInvoiceItem(
    @Param('invoiceId') invoiceId: string,
    @Body() body: any,
    @Session('userId') userId: string,
  ) {
    const dto = AddInvoiceItemSchema.parse(body);
    return await this.invoicesService.addInvoiceItem(invoiceId, dto, userId);
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
  @VerifySession()
  async updateInvoiceItem(
    @Param('invoiceId') invoiceId: string,
    @Param('itemId') itemId: string,
    @Body() body: any,
    @Session('userId') userId: string,
  ) {
    const dto = UpdateInvoiceItemSchema.parse(body);
    return await this.invoicesService.updateInvoiceItem(
      invoiceId,
      itemId,
      dto,
      userId,
    );
  }

  @Delete(':invoiceId/items/:itemId')
  @VerifySession()
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
