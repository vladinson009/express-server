import express from 'express';
import 'dotenv/config.js';
import mongooseConfig from './configs/mongooseConfig.js';
import expressConfig from './configs/expressConfig.js';
import { bootstrapAppConst } from './constants.js';

async function bootstrap() {
  const app = express();

  try {
    await mongooseConfig();
    console.log(bootstrapAppConst.DB_SUCCESSFULLY);
  } catch (error) {
    console.log(bootstrapAppConst.DB_ERROR(error as Error));
    process.exit(1);
  }
  expressConfig(app);

  app.listen(bootstrapAppConst.PORT, () =>
    console.log(bootstrapAppConst.APP_LISTEN)
  );
}
bootstrap().catch((error) => {
  console.error(bootstrapAppConst.BOOTSTRAP_ERROR, error);
  process.exit(1);
});
