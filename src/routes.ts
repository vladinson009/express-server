import { Router } from 'express';
import userController from './controllers/userController.js';

const router = Router();

router.use(userController);

export default router;
