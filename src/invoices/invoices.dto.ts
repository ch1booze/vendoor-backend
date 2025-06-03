import { z } from 'zod';
import { InvoiceStatus } from '@prisma/client';

export const InvoiceItemSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

export const CreateInvoiceSchema = z.object({
  businessId: z.string().uuid('Invalid business ID'),
  items: z.array(InvoiceItemSchema).min(1, 'At least one item is required'),
  status: z.nativeEnum(InvoiceStatus).optional().default(InvoiceStatus.DRAFTED),
});

export const UpdateInvoiceSchema = z.object({
  status: z.nativeEnum(InvoiceStatus).optional(),
  items: z.array(InvoiceItemSchema).optional(),
});

export const AddInvoiceItemSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

export const UpdateInvoiceItemSchema = z.object({
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

export type CreateInvoiceDto = z.infer<typeof CreateInvoiceSchema>;
export type UpdateInvoiceDto = z.infer<typeof UpdateInvoiceSchema>;
export type AddInvoiceItemDto = z.infer<typeof AddInvoiceItemSchema>;
export type UpdateInvoiceItemDto = z.infer<typeof UpdateInvoiceItemSchema>;
