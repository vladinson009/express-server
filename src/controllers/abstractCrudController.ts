import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { HttpError } from '../utils/errorParser.js';
import type { CrudControllerConfig } from '../types/CrudController.js';

export function createCrudController({
  paths,
  paramName,
  service,
}: CrudControllerConfig) {
  const router = Router();

  // GET BY ID
  router.get(paths.getById, async (req, res, next) => {
    try {
      const id = req.params[paramName];
      const result = await service.getById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  // GET ALL
  router.get(paths.getAll, async (req, res, next) => {
    try {
      const result = await service.getAll(req.query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  // CREATE
  router.post(paths.create, authenticate, async (req, res, next) => {
    try {
      const created = await service.create(req.body);
      res.status(200).json(created);
    } catch (error) {
      next(error);
    }
  });

  // EDIT
  router.put(paths.edit, authenticate, async (req, res, next) => {
    try {
      const id = req.params[paramName];
      const userId = req.user!._id;

      const doc = await service.getById(id);
      if (!doc) {
        throw new HttpError(404, 'Document does not exists!');
      }
      const author = doc.author;
      if (!author._id?.equals(userId)) {
        throw new HttpError(401, 'You are not the author!');
      }

      const updated = await service.edit(req.body, id);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  });

  // DELETE
  router.delete(paths.delete, authenticate, async (req, res, next) => {
    try {
      const id = req.params[paramName];
      const userId = req.user!._id;

      const doc = await service.getById(id);
      if (!doc) {
        throw new HttpError(404, 'Document does not exists!');
      }
      const author = doc?.author;
      if (!author?._id.equals(userId)) {
        throw new HttpError(401, 'You are not the author!');
      }

      const deleted = await service.delete(id);
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  });
  // PUSH LIKE TO SET
  router.get(paths.like!, authenticate, async (req, res, next) => {
    try {
      const id = req.params[paramName];
      const userId = req.user!._id.toString();
      const liked = await service.addLike(id, userId);
      res.status(200).json(liked);
    } catch (error) {
      next(error);
    }
  });
  // PULL LIKE FROM SET
  router.get(paths.unlike!, authenticate, async (req, res, next) => {
    try {
      const id = req.params[paramName];
      const userId = req.user!._id.toString();
      const unliked = await service.removeLike(id, userId);
      res.status(200).json(unliked);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
