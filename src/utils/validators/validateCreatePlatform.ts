import { z } from 'zod';

export const CreatePlatformSchema = z.object({
  name: z
    .string({ required_error: 'Name is required!' })
    .nonempty('Name is required!'),
  manufacturer: z.string().optional(),
});

export type CreatePlatformInput = z.infer<typeof CreatePlatformSchema>;
