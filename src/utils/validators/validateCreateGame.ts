import { z } from 'zod';
import { gameConstants } from '../../constants/gameConstants.js';

export const CreateGameSchema = z.object({
  title: z
    .string({ required_error: 'Title is required!' })
    .nonempty('Title is required!')
    .min(
      gameConstants.MIN_TITLE_LENGTH,
      `Title must be at least ${gameConstants.MIN_TITLE_LENGTH} characters!`
    ),
  description: z.string().optional(),
  price: z
    .number({
      required_error: 'Price is required!',
      invalid_type_error: 'Price must be a number!',
    })
    .nonnegative('Price cannot be negative!'),
  releaseDate: z.string().optional(),
  imageUrl: z
    .string({ required_error: 'ImageUrl is required!' })
    .nonempty('ImageUrl is required!')
    .min(
      gameConstants.MIN_IMG_URL_LENGTH,
      `ImageUrl must be at least ${gameConstants.MIN_IMG_URL_LENGTH} characters!`
    ),
  categories: z.array(z.string()).optional(),
  platforms: z.array(z.string()).optional(),
  author: z
    .string({ required_error: 'Author is required!' })
    .nonempty('Author is required!')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid author ID!'),
  likes: z.array(z.string()).optional(),
});

export type CreateGameInput = z.infer<typeof CreateGameSchema>;
