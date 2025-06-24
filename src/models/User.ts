import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  HASH_ROUNDS,
  MIN_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../constants.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: MIN_USERNAME_LENGTH,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: MIN_EMAIL_LENGTH,
    },
    password: {
      type: String,
      required: true,
      minLength: MIN_PASSWORD_LENGTH,
    },
  },
  { collation: { locale: 'en', strength: 2 } }
);
userSchema.pre('save', async function () {
  const hashedPassword = await bcrypt.hash(this.password, HASH_ROUNDS);
  this.password = hashedPassword;
});

export default model('user', userSchema);
