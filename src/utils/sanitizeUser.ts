import { UserDoc } from '../types/express/index.js';

export default function sanitizeUser(user: UserDoc) {
  const { _id, username, email, role, createdAt, updatedAt } = user;
  return {
    _id,
    username,
    email,
    role,
    createdAt,
    updatedAt,
  };
}
