import { model, Schema } from 'mongoose';

const platformSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    manufacturer: { type: String },
  },
  { collation: { locale: 'en', strength: 2 }, timestamps: true }
);

export default model('platform', platformSchema);
