import { model, Schema } from 'mongoose';

const platformSchema = new Schema(
  {
    name: { type: String, required: true },
    manufacturer: { type: String },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          const pattern = /^https?:\/\//;
          return pattern.test(value);
        },
        message: `Image url should be a valid URL`,
      },
    },
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

export default model('platform', platformSchema);
