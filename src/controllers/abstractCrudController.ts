// // utils/createCrudController.ts

// import { Router, Request, Response, NextFunction } from 'express';
// import { authenticate } from '../middlewares/authenticate.js';
// import { HttpError } from '../utils/errorParser.js';
// import { CrudController } from '../types/CrudController.js';

// export function createCrudController({ paths, service }: CrudController<T>) {
//   const router = Router();

//   // GET BY ID
//   router.get(
//     paths.getById,
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         const id = req.params?.cardId || req.params?.gameId;
//         const result = await service.getById(id);
//         res.status(200).json(result);
//       } catch (error) {
//         next(error);
//       }
//     }
//   );

//   // GET ALL
//   router.get('', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const result = await service.getAll();
//       res.status(200).json(result);
//     } catch (error) {
//       next(error);
//     }
//   });

//   // CREATE
//   router.post(
//     paths.create,
//     authenticate,
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         const created = await service.create(req.body);
//         res.status(200).json(created);
//       } catch (error) {
//         next(error);
//       }
//     }
//   );

//   // EDIT
//   router.put(
//     paths.edit,
//     authenticate,
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         const id = req.params?.cardId || req.params?.gameId;
//         const updated = await service.edit(req.body, id);
//         res.status(200).json(updated);
//       } catch (error) {
//         next(error);
//       }
//     }
//   );

//   // DELETE
//   router.delete(
//     paths.delete,
//     authenticate,
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         const id = req.params?.cardId || req.params?.gameId;
//         const userId = req.user!._id;

//         const author = await service.getById(id).lean()?.author;
//         const isAuthor = author && author.equals(userId);
//         if (!isAuthor) {
//           throw new HttpError(401, 'You are not the author!');
//         }

//         const deleted = await service.delete(id);
//         res.status(204).json(deleted);
//       } catch (error) {
//         next(error);
//       }
//     }
//   );

//   return router;
// }
//TODO abstract class
