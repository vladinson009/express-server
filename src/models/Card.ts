import { model, Schema } from 'mongoose';
import { cardConstants } from '../constants/cardConstants.js';

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: cardConstants.MIN_TITLE_LENGTH,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
      minLength: cardConstants.MIN_IMG_URL_LENGTH,
    },
    category: { type: String },
    price: { type: Number },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { timestamps: true }
);

export default model('card', cardSchema);
