import { z } from 'zod';

export const EditCategorySchema = z.object({
  name: z
    .string({ required_error: 'Name is required!' })
    .nonempty('Name is required!'),
  description: z.string().optional(),
});

export type EditCategoryInput = z.infer<typeof EditCategorySchema>;
