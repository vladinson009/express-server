import User from '../models/User.js';
import bcrypt from 'bcrypt';
import createToken from '../utils/createToken.js';
import { LoginUserSchema } from '../utils/validateLoginUser.js';
import {
  RegisterUserInput,
  RegisterUserSchema,
} from '../utils/validateRegisterUser.js';

export default class UserService {
  public static async register(userInput: unknown) {
    const parsed = await RegisterUserSchema.safeParseAsync(userInput);
    if (!parsed.success) {
      throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
    }
    console.log('validData');
    const { repass, ...validData }: RegisterUserInput = parsed.data;
    try {
      const isUser = await User.findOne({ email: validData.email });
      if (isUser) {
        throw new Error('Email already exists!');
      }

      const newUser = await User.create(validData);
      return createToken(newUser);
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        console.log(error);
      }
    }
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
      throw new Error('Invalid Data');
    }
    try {
      const parsed = await LoginUserSchema.safeParseAsync(userInput);

      if (!parsed.success) {
        throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
      }
      const validData = parsed.data;
      const user = await User.findOne({ username: validData.username });
      if (!user) {
        throw new Error('Invalid email or password');
      }
      const userInputPassword = userInput.password;
      const userPassword = user.password;
      const isValidPassword = await bcrypt.compare(userInputPassword, userPassword);

      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }
      return createToken(user);
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        console.log(error);
      }
    }
  }
}
