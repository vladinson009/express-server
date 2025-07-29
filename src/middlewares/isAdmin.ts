// middlewares/authenticate.ts
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/errorParser.js';

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user!;
  if (user.role !== 'admin') {
    return next(new HttpError(403, 'You are not an admin!'));
  }
  next();
}
