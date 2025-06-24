import { HydratedDocument } from 'mongoose';

export interface LoginUserInput {
  username: string;
  password: string;
}
interface RegisterUserInput extends LoginUserInput {
  email: string;
  repass: string;
}

export type NewUserType = HydratedDocument<Omit<RegisterUserInput, 'repass'>>;
