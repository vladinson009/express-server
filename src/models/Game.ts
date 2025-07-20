import { model, Query, Schema } from 'mongoose';
import { gameConstants } from '../constants/gameConstants.js';

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,

      minLength: gameConstants.MIN_TITLE_LENGTH,
    },
    description: {
      type: String,
      default: gameConstants.DEFAULT_DESCRIPTION,
    },
    price: { type: Number, required: true },
    releaseDate: { type: Date, default: gameConstants.DEFAULT_DATE },
    imageUrl: {
      type: String,
      required: true,
      minLength: gameConstants.MIN_IMG_URL_LENGTH,
    },
    categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
    platforms: [{ type: Schema.Types.ObjectId, ref: 'platform' }],
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
gameSchema.pre(/^find/, function (this: Query<any, any>, next) {
  this.populate([
    { path: 'categories', select: 'name description author likes' },
    { path: 'platforms', select: 'name manufacturer imageUrl author likes' },
  ]);
  next();
});

export default model('game', gameSchema);

//TODO
// When you want to get all games in a category:

// const games = await Game.find({ categories: categoryId });
