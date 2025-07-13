import { Router, Request, Response, NextFunction } from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { cardsPath } from '../constants/routeConstants.js';
import CardServices from '../services/cardServices.js';
import { HttpError } from '../utils/errorParser.js';

const cardController = Router();

// * Get By Id
cardController.get(
  cardsPath.getById,
  async (req: Request, res: Response, next: NextFunction) => {
    const cardId = req.params && req.params.cardId;
    try {
      const card = await CardServices.getById(cardId);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  }
);
// * Get All
cardController.get('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await CardServices.getAll();
    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
});
// * Create new card
cardController.post(
  cardsPath.create,
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const cardInput: unknown = req.body;
    try {
      const card = await CardServices.create(cardInput);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  }
);
// * Edit card
cardController.put(
  cardsPath.edit,
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const userInput: unknown = req.body;
    const userId = req.user!._id;
    const cardId = req.params && req.params.cardId;
    try {
      const author = (await CardServices.getById(cardId).lean())?.author;
      const isAuthor = author && author?.equals(userId);
      if (!isAuthor) {
        throw new HttpError(401, 'You are not the author!');
      }
      const card = await CardServices.edit(userInput, cardId);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  }
);
// * Delete card
cardController.delete(
  cardsPath.delete,
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const cardId = req.params && req.params.cardId;
    const userId = req.user!._id;
    try {
      const author = (await CardServices.getById(cardId).lean())?.author;
      const isAuthor = author && author?.equals(userId);
      if (!isAuthor) {
        throw new HttpError(401, 'You are not the author!');
      }
      const deleted = await CardServices.delete(cardId);
      res.status(204).json(deleted);
    } catch (error) {
      next(error);
    }
  }
);
export default cardController;
