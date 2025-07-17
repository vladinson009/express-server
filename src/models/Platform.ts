import { model, Schema } from 'mongoose';

const platformSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
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
  },
  { collation: { locale: 'en', strength: 2 }, timestamps: true }
);

export default model('platform', platformSchema);
