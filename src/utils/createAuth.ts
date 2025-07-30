import environment from '../constants/environment.js';
import { UserDoc } from '../types/express/index.js';
import JwtPromisify from './jwtPromisify.js';

export default async function (user: UserDoc) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    tokenVersion: user.tokenVersion,
  };

  const token = await JwtPromisify.sign(payload, environment.SECRET_TOKEN, {
    expiresIn: '2h',
  });
  return {
    token: token,
    _id: payload._id,
    username: payload.username,
    email: payload.email,
    role: payload.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
