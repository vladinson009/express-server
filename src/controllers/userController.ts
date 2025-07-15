import { Router, Request, Response, NextFunction } from 'express';

import UserServices from '../services/userServices.js';
import { authenticate } from '../middlewares/authenticate.js';
import { usersPath } from '../constants/routeConstants.js';
import sanitizeUser from '../utils/sanitizeUser.js';

const userController = Router();

// * Register new user
userController.post(
  usersPath.register,
  async (req: Request, res: Response, next: NextFunction) => {
    const userInput: unknown = req.body;
    try {
      const responseData = await UserServices.register(userInput);
      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }
);
// * Login user
userController.post(
  usersPath.login,
  async (req: Request, res: Response, next: NextFunction) => {
    const userInput: unknown = req.body;
    try {
      const responseData = await UserServices.login(userInput);
      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }
);
// * Logout user
userController.get(
  usersPath.logout,
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    try {
      await UserServices.logout(user._id);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  }
);
// * Me Info
userController.get(
  usersPath.me,
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user!;
      const sanitizedUser = sanitizeUser(user);
      res.status(200).json(sanitizedUser);
    } catch (error) {
      next(error);
    }
  }
);
export default userController;
