import User from '../models/User.js';
import bcrypt from 'bcrypt';

import createToken from '../utils/createToken.js';
import { LoginUserSchema } from '../utils/validators/validateLoginUser.js';
import {
  RegisterUserInput,
  RegisterUserSchema,
} from '../utils/validators/validateRegisterUser.js';
import { HttpError } from '../utils/errorParser.js';
import { UserId } from '../types/UserServices.js';

export default class UserServices {
  public static async register(userInput: unknown) {
    const parsed = await RegisterUserSchema.safeParseAsync(userInput);
    if (!parsed.success) {
      throw new HttpError(400, parsed.error.issues.map((i) => i.message).join(', '));
    }
    const { repass, ...validData }: RegisterUserInput = parsed.data;

    const isUser = await User.findOne({
      $or: [{ email: validData.email }, { username: validData.username }],
    });
    if (isUser) {
      if (isUser.email === validData.email) {
        throw new HttpError(409, 'Email already exists!');
      } else if (isUser.username === validData.username) {
        throw new HttpError(409, 'Username already exists!');
      }
    }
    const newUser = await User.create(validData);
    return createToken(newUser);
  }
  public static async login(userInput: unknown) {
    if (
      typeof userInput !== 'object' ||
      userInput == null ||
      !('username' in userInput) ||
      !('password' in userInput) ||
      typeof userInput.password !== 'string' ||
      typeof userInput.username !== 'string'
    ) {
      throw new HttpError(400, 'Invalid User Input Data');
    }
    const parsed = await LoginUserSchema.safeParseAsync(userInput);

    if (!parsed.success) {
      throw new HttpError(400, parsed.error.issues.map((i) => i.message).join(', '));
    }
    const { username, password } = parsed.data;
    const user = await User.findOne({ username });
    if (!user) {
      throw new HttpError(401, 'Invalid email or password');
    }
    if (user.isDeleted) {
      throw new HttpError(
        404,
        `User was deleted at ${user.deletedAt.toLocaleDateString('en-GB')}`
      );
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new HttpError(401, 'Invalid email or password');
    }
    return createToken(user);
  }
  public static async logout(userId: UserId): Promise<Response | null> {
    return User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
  }
  public static async me(userId: UserId) {
    return User.findById(userId);
  }
}
