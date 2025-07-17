import { z } from 'zod';
import { cardConstants } from '../../constants/cardConstants.js';

export const CreateCardSchema = z.object({
  title: z
    .string({ required_error: 'Title is required!' })
    .nonempty('Title is required!')
    .min(
      cardConstants.MIN_TITLE_LENGTH,
      `Title must be at least ${cardConstants.MIN_TITLE_LENGTH} characters!`
    ),
  description: z.string().optional(),
  imageUrl: z
    .string({ required_error: 'ImageUrl is required!' })
    .nonempty('ImageUrl is required!')
    .min(
      cardConstants.MIN_IMG_URL_LENGTH,
      `ImageUrl must be at least ${cardConstants.MIN_IMG_URL_LENGTH} characters!`
    ),
  author: z
    .string({ required_error: 'Author is required!' })
    .nonempty('Author is required!')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid author ID!'),
  likes: z.array(z.string()).optional(),
  price: z.number({ invalid_type_error: 'Price must be of type Number' }).optional(),
  category: z.string().optional(),
});

export type CreateCardInput = z.infer<typeof CreateCardSchema>;
