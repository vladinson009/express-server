import { z } from 'zod';

export const EditCategorySchema = z.object({
  description: z.string().optional(),
});

export type EditCategoryInput = z.infer<typeof EditCategorySchema>;
