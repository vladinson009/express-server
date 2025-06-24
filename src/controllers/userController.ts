import { Router } from 'express';
import UserService from '../services/userService.js';

const userController = Router();

// * Register new user
userController.post('/register', async (req, res) => {
  const userInput: unknown = req.body;

  try {
    const token = await UserService.register(userInput);
    res.json(token);
  } catch (error) {
    if (error instanceof Error) {
      res.json(error.message);
    } else {
      res.json('Uncaught error!');
    }
  }
});
export default userController;
