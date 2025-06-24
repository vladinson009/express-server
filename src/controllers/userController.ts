import { Router } from 'express';
import UserService from '../services/userService.js';
import { UNCAUGH_ERROR_MSG } from '../constants.js';

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
      res.json(error);
    }
  }
});
userController.post('/login', async (req, res) => {
  const userInput: unknown = req.body;
  try {
    const token = await UserService.login(userInput);
    res.json(token);
  } catch (error) {
    if (error instanceof Error) {
      res.json(error.message);
    } else {
      res.json(error);
    }
  }
});
export default userController;
