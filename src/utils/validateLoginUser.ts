import { z } from 'zod';
import { mongooseConst } from '../constants/constants.js';

export const LoginUserSchema = z.object({
  username: z
    .string()
    .min(
      mongooseConst.MIN_USERNAME_LENGTH,
      `Username must be at least ${mongooseConst.MIN_USERNAME_LENGTH} characters`
    ),
  password: z
    .string()
    .min(
      mongooseConst.MIN_PASSWORD_LENGTH,
      `Password must be at least ${mongooseConst.MIN_PASSWORD_LENGTH} characters`
    ),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
