import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.string(),
  unit: z.string(),
  category: z.string(),
  data: z.record(z.unknown()).optional(),
  businessId: z.string().uuid(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
