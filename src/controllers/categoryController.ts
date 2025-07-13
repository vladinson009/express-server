import { Router, Request, Response, NextFunction } from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { categoriesPath } from '../constants/routeConstants.js';
import CategoryServices from '../services/categoryServices.js';
import { HttpError } from '../utils/errorParser.js';
import { createCrudController } from './abstractCrudController.js';

export default createCrudController({
  paths: categoriesPath,
  paramName: 'categoryId',
  service: CategoryServices,
});
// const categoryController = Router();

// // * Get By Id
// categoryController.get(
//   categoriesPath.getById,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const categoryId = req.params && req.params.categoryId;
//     try {
//       const category = await CategoryServices.getById(categoryId);
//       res.status(200).json(category);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// // * Get All
// categoryController.get(
//   '',
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const categories = await CategoryServices.getAll();
//       res.status(200).json(categories);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// // * Create new category
// categoryController.post(
//   categoriesPath.create,
//   authenticate,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user!;
//     if (user.role === 'user') {
//       throw new HttpError(401, 'You have no permission!');
//     }
//     const categoryInput: unknown = req.body;
//     try {
//       const isExist = await CategoryServices.isExist({ name: req.body?.name });
//       if (isExist) {
//         throw new HttpError(409, 'Category already exists!');
//       }
//       const category = await CategoryServices.create(categoryInput);
//       res.status(200).json(category);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// // * Edit category
// categoryController.put(
//   categoriesPath.edit,
//   authenticate,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const userInput: unknown = req.body;
//     const user = req.user!;

//     if (user.role === 'user') {
//       throw new HttpError(401, 'You have no permission!');
//     }
//     const categoryId = req.params && req.params.categoryId;
//     try {
//       const category = await CategoryServices.edit(userInput, categoryId);
//       res.status(200).json(category);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// // * Delete category
// categoryController.delete(
//   categoriesPath.delete,
//   authenticate,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const categoryId = req.params && req.params.categoryId;
//     const user = req.user!;
//     if (user.role === 'user') {
//       throw new HttpError(401, 'You have no permission!');
//     }
//     try {
//       const deleted = await CategoryServices.delete(categoryId);
//       res.status(204).json(deleted);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// export default categoryController;
