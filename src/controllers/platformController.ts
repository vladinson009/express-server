import { Router, Request, Response, NextFunction } from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { platformsPath } from '../constants/routeConstants.js';
import PlatformServices from '../services/platformServices.js';
import { HttpError } from '../utils/errorParser.js';

const platformController = Router();

// * Get By Id
platformController.get(
  platformsPath.getById,
  async (req: Request, res: Response, next: NextFunction) => {
    const platformId = req.params && req.params.platformId;
    try {
      const platform = await PlatformServices.getById(platformId);
      res.status(200).json(platform);
    } catch (error) {
      next(error);
    }
  }
);
// * Get All
platformController.get(
  '',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const platforms = await PlatformServices.getAll();
      res.status(200).json(platforms);
    } catch (error) {
      next(error);
    }
  }
);
// * Create new platform
platformController.post(
  platformsPath.create,
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    if (user.role === 'user') {
      throw new HttpError(401, 'You have no permission!');
    }
    const platformInput: unknown = req.body;
    try {
      const isExist = await PlatformServices.isExist({ name: req.body?.name });
      if (isExist) {
        throw new HttpError(409, 'Platform already exists!');
      }
      const platform = await PlatformServices.create(platformInput);
      res.status(200).json(platform);
    } catch (error) {
      next(error);
    }
  }
);
// * Edit platform
platformController.put(
  platformsPath.edit,
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const userInput: unknown = req.body;
    const user = req.user!;

    if (user.role === 'user') {
      throw new HttpError(401, 'You have no permission!');
    }
    const platformId = req.params && req.params.platformId;
    try {
      const platform = await PlatformServices.edit(userInput, platformId);
      res.status(200).json(platform);
    } catch (error) {
      next(error);
    }
  }
);
// * Delete platform
platformController.delete(
  platformsPath.delete,
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const platformId = req.params && req.params.platformId;
    const user = req.user!;
    if (user.role === 'user') {
      throw new HttpError(401, 'You have no permission!');
    }
    try {
      const deleted = await PlatformServices.delete(platformId);
      res.status(204).json(deleted);
    } catch (error) {
      next(error);
    }
  }
);
export default platformController;
