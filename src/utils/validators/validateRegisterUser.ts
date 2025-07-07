import { z } from 'zod';
import { mongooseConst } from '../../constants/constants.js';

export const RegisterUserSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required!' })
      .nonempty('Username is required!')
      .min(
        mongooseConst.MIN_USERNAME_LENGTH,
        `Username must be at least ${mongooseConst.MIN_USERNAME_LENGTH} characters`
      ),
    email: z
      .string({ required_error: 'Email is required!' })
      .nonempty('Email is required!')
      .email('Invalid email')
      .min(
        mongooseConst.MIN_EMAIL_LENGTH,
        `Email must be at least ${mongooseConst.MIN_EMAIL_LENGTH} characters`
      ),
    password: z
      .string({ required_error: 'Password is required!' })
      .nonempty('Password is required!')
      .min(
        mongooseConst.MIN_PASSWORD_LENGTH,
        `Password must be at least ${mongooseConst.MIN_PASSWORD_LENGTH} characters`
      ),
    repass: z
      .string({ required_error: 'Repeat password is required!' })
      .nonempty('Repeat password is required!')
      .min(mongooseConst.MIN_PASSWORD_LENGTH),
  })
  .refine((data) => data.password === data.repass, {
    path: ['repass'],
    message: 'Passwords do not match',
  });

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
