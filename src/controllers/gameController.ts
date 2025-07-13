import { Router, Request, Response, NextFunction } from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { gamesPath } from '../constants/routeConstants.js';
import GameServices from '../services/gameServices.js';
import { HttpError } from '../utils/errorParser.js';

const gameController = Router();

// * Get By Id
gameController.get(
  gamesPath.getById,
  async (req: Request, res: Response, next: NextFunction) => {
    const gameId = req.params && req.params.gameId;
    try {
      const game = await GameServices.getById(gameId);
      res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  }
);
// * Get All
gameController.get('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const games = await GameServices.getAll();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
});
// * Create new game
gameController.post(
  gamesPath.create,
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const gameInput: unknown = req.body;
    try {
      const game = await GameServices.create(gameInput);
      res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  }
);
// * Edit game
gameController.put(
  gamesPath.edit,
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const userInput: unknown = req.body;
    const userId = req.user!._id;
    const gameId = req.params && req.params.gameId;
    try {
      const author = (await GameServices.getById(gameId).lean())?.author;
      const isAuthor = author && author?.equals(userId);
      if (!isAuthor) {
        throw new HttpError(401, 'You are not the author!');
      }
      const game = await GameServices.edit(userInput, gameId);
      res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  }
);
// * Delete game
gameController.delete(
  gamesPath.delete,
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const gameId = req.params && req.params.gameId;
    const userId = req.user!._id;
    try {
      const author = (await GameServices.getById(gameId).lean())?.author;
      const isAuthor = author && author?.equals(userId);
      if (!isAuthor) {
        throw new HttpError(401, 'You are not the author!');
      }
      const deleted = await GameServices.delete(gameId);
      res.status(204).json(deleted);
    } catch (error) {
      next(error);
    }
  }
);

export default gameController;
