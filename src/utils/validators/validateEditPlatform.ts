import { z } from 'zod';

export const EditPlatformSchema = z.object({
  manufacturer: z.string().optional(),
});

export type EditPlatformInput = z.infer<typeof EditPlatformSchema>;
