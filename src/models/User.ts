import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import environment from '../constants/environment.js';
import { mongooseConst } from '../constants/constants.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: mongooseConst.MIN_USERNAME_LENGTH,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: mongooseConst.MIN_EMAIL_LENGTH,
    },
    password: {
      type: String,
      required: true,
      minLength: mongooseConst.MIN_PASSWORD_LENGTH,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    },
    tokenVersion: {
      type: Number,
      default: 1,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: { type: Date, default: null },
  },
  { collation: { locale: 'en', strength: 2 }, timestamps: true }
);
userSchema.index(
  { deletedAt: 1 },
  { expireAfterSeconds: mongooseConst.EXPIRES_AFTER_SECONDS }
);
userSchema.pre('save', async function () {
  const hashedPassword = await bcrypt.hash(this.password, environment.HASH_ROUNDS);
  this.password = hashedPassword;
});

export default model('user', userSchema);

/** // TODO:
 * flag to isDeleted true and add deletedAt
const expireDate = new Date(Date.now()); // now, since TTL counts from this field

await User.findByIdAndUpdate(userId, {
  isDeleted: true,
  deletedAt: expireDate,
});
 
 */
