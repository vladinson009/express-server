import { HydratedDocument, Types } from 'mongoose';

export interface LoginUserInput {
  username: string;
  password: string;
}
interface RegisterUserInput extends LoginUserInput {
  email: string;
  repass: string;
}

export type NewUserType = HydratedDocument<Omit<RegisterUserInput, 'repass'>>;

export type UserId = string | Types.ObjectId;
