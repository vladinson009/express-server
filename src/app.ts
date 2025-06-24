import express from 'express';
import 'dotenv/config';
import mongooseConfig from './configs/mongooseConfig.js';
import expressConfig from './configs/expressConfig.js';

const app = express();

try {
  await mongooseConfig();
  console.log('DB connected successfully...');
} catch (error) {
  console.log(`DB can NOT connect... : ${error}`);
}
expressConfig(app);

app.listen(3000, () =>
  console.log('Server is listening on http://localhost:3000...')
);
