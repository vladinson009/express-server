import { z } from 'zod';
import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from '../constants.js';

export const LoginUserSchema = z.object({
  username: z
    .string()
    .min(
      MIN_USERNAME_LENGTH,
      `Username must be at least ${MIN_USERNAME_LENGTH} characters`
    ),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
    ),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
