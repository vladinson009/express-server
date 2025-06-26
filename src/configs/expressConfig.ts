import type { Express } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import router from '../routes.js';
import httpErrorHandler from '../middlewares/httpErrorHandler.js';

export default function (app: Express) {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(router);
  app.use(httpErrorHandler);
}
