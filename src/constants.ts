// ! * PORT
const PORT = 3001;

// * Bootstrap App
export const bootstrapApp = {
  PORT,
  DB_SUCCESSFULLY: '✅ DB connected successfully...',
  APP_LISTEN: `🚀 Server is listening on http://localhost:${PORT}...`,
  DB_ERROR: (err: Error) => `❌ DB can NOT connect... : ${err}`,
  BOOTSTRAP_ERROR: '❌ Error during bootstrap:',
};

// * Mongoose schema
export const MIN_USERNAME_LENGTH = 3;
export const MIN_EMAIL_LENGTH = 6;
export const MIN_PASSWORD_LENGTH = 6;

// * Server error
export const UNCAUGH_ERROR_MSG =
  'Uncaugh error! Something went wrong with the server :(';
