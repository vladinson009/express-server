import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../utils/errorParser.js';

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
  return;
}
