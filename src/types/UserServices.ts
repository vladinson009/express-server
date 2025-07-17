import { Types } from 'mongoose';

export type UserId = string | Types.ObjectId;

export interface AuthUserResponse {
  _id: string;
  username: string;
  email: string;
  role: string;
  tokenVersion: string;
}
