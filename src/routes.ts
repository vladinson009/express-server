import { Router } from 'express';
import {
  cardsPath,
  usersPath,
  gamesPath,
  categoriesPath,
  platformsPath,
} from './constants/routeConstants.js';

import userController from './controllers/userController.js';
import cardController from './controllers/cardController.js';
import gameController from './controllers/gameController.js';
import categoryController from './controllers/categoryController.js';
import platformController from './controllers/platformController.js';

const router = Router();

router.use(usersPath.root, userController);
router.use(cardsPath.root, cardController);
router.use(gamesPath.root, gameController);
router.use(categoriesPath.root, categoryController);
router.use(platformsPath.root, platformController);

export default router;
