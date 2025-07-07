import { Router } from 'express';

import userController from './controllers/userController.js';
import { cardsPath, usersPath } from './constants/routeConstants.js';
import cardController from './controllers/cardController.js';

const router = Router();

router.use(usersPath.root, userController);
router.use(cardsPath.root, cardController);

export default router;
