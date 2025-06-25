import type { InferSchemaType, Document, Types } from 'mongoose';

import User from '../../models/User.js';

export type UserDoc = InferSchemaType<typeof User.schema> &
  Document & { _id: Types.ObjectId };
declare global {
  namespace Express {
    interface Request {
      user?: UserDoc;
    }
  }
}
