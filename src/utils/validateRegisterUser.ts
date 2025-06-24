import { z } from 'zod';
import {
  MIN_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../constants.js';

export const RegisterUserSchema = z
  .object({
    username: z
      .string()
      .min(
        MIN_USERNAME_LENGTH,
        `Username must be at least ${MIN_USERNAME_LENGTH} characters`
      ),
    email: z
      .string()
      .email('Invalid email')
      .min(
        MIN_EMAIL_LENGTH,
        `Email must be at least ${MIN_EMAIL_LENGTH} characters`
      ),
    password: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
      ),
    repass: z.string().min(6),
  })
  .refine((data) => data.password === data.repass, {
    path: ['repass'],
    message: 'Passwords do not match',
  });

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
