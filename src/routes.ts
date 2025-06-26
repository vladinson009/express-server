import { Router } from 'express';

import userController from './controllers/userController.js';
import { usersPath } from './constants/routeConstants.js';

const router = Router();

router.use(usersPath.root, userController);

export default router;
