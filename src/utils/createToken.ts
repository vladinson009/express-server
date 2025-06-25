import environment from '../constants/environment.js';
import { NewUserType } from '../types/UserService.js';
import JwtPromisify from './jwtPromisify.js';

export default async function (user: NewUserType) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = await JwtPromisify.sign(payload, environment.SECRET_TOKEN, {
    expiresIn: '2h',
  });
  return token;
}
