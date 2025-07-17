import { z } from 'zod';

export const EditPlatformSchema = z.object({
  manufacturer: z.string().optional(),
  imageUrl: z
    .string({
      required_error: 'imageUrl is required!',
      invalid_type_error: 'imageUrl must be a valid URL',
    })
    .url(),
});

export type EditPlatformInput = z.infer<typeof EditPlatformSchema>;
