import express from 'express';
import 'dotenv/config.js';
import mongooseConfig from './configs/mongooseConfig.js';
import expressConfig from './configs/expressConfig.js';
import { bootstrapApp } from './constants.js';

async function bootstrap() {
  const app = express();

  try {
    await mongooseConfig();
    console.log(bootstrapApp.DB_SUCCESSFULLY);
  } catch (error) {
    console.log(bootstrapApp.DB_ERROR(error as Error));
    process.exit(1);
  }
  expressConfig(app);

  app.listen(bootstrapApp.PORT, () => console.log(bootstrapApp.APP_LISTEN));
}
bootstrap().catch((error) => {
  console.error(bootstrapApp.BOOTSTRAP_ERROR, error);
  process.exit(1);
});
