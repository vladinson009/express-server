// middlewares/authenticate.ts
import { Request, Response, NextFunction } from 'express';

import User from '../models/User.js';
import { HttpError } from '../utils/errorParser.js';
import JwtPromisify from '../utils/jwtPromisify.js';
import environment from '../constants/environment.js';
import { authHeader } from '../constants/constants.js';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const rawToken = req.headers[authHeader];
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;

  if (!token) {
    return next(new HttpError(401, 'Missing token'));
  }
  try {
    const payload = await JwtPromisify.verify(token, environment.SECRET_TOKEN);
    const user = await User.findById(payload._id);
    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return next(new HttpError(401, 'Invalid or expired token'));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new HttpError(401, 'Unauthorized'));
  }
}
