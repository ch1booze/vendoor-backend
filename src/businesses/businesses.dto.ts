import { z } from 'zod';

export const createBusinessSchema = z.object({
  userId: z.string().uuid(),
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
  workingHours: z.record(z.unknown()).optional(),
});

export type CreateBusinessDto = z.infer<typeof createBusinessSchema>;
