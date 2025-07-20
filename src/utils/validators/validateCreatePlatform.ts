import { z } from 'zod';

export const CreatePlatformSchema = z.object({
  name: z
    .string({ required_error: 'Name is required!' })
    .nonempty('Name is required!'),
  manufacturer: z.string().optional(),
  imageUrl: z
    .string({
      required_error: 'imageUrl is required!',
      invalid_type_error: 'imageUrl must be a valid URL',
    })
    .url(),
  author: z.string({ required_error: 'Author is required' }),
});

export type CreatePlatformInput = z.infer<typeof CreatePlatformSchema>;
