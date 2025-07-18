import { z } from 'zod';

export const CreateCategorySchema = z.object({
  name: z
    .string({ required_error: 'Name is required!' })
    .nonempty('Name is required!'),
  description: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
