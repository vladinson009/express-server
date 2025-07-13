import { model, Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: 'Coming soon...' },
  },
  { collation: { locale: 'en', strength: 2 }, timestamps: true }
);

export default model('category', categorySchema);
