// * Mongoose schema
export const HASH_ROUNDS = 12;
export const MIN_USERNAME_LENGTH = 3;
export const MIN_EMAIL_LENGTH = 6;
export const MIN_PASSWORD_LENGTH = 6;

// * Create Token Secret
export const SECRET_TOKEN = process.env.SECRET_TOKEN || 'alaBaLa';
