import { z } from 'zod';

export const EditPlatformSchema = z.object({
  name: z.string().optional(),
  manufacturer: z.string().optional(),
});

export type EditPlatformInput = z.infer<typeof EditPlatformSchema>;
