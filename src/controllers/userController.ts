import { Router, Request, Response } from 'express';

import UserService from '../services/userService.js';
import { authenticate } from '../middlewares/authenticate.js';
import { usersPath } from '../constants/routeConstants.js';

const userController = Router();

// * Register new user
userController.post(
  usersPath.register,
  async (req: Request, res: Response, next) => {
    const userInput: unknown = req.body;
    try {
      const token = await UserService.register(userInput);
      res.json(token);
    } catch (error) {
      next(error);
    }
  }
);
// * Login user
userController.post(usersPath.login, async (req: Request, res: Response, next) => {
  const userInput: unknown = req.body;
  try {
    const token = await UserService.login(userInput);
    res.json(token);
  } catch (error) {
    next(error);
  }
});
// * Logout user
userController.post(
  usersPath.logout,
  authenticate,
  async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    await UserService.logout(user._id);
    res.status(200).json({ message: 'Logged out successfully' });
  }
);
export default userController;
