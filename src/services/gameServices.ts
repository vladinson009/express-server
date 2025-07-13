// import { HttpError } from '../utils/errorParser.js';
import Game from '../models/Game.js';

import { CreateGameSchema } from '../utils/validators/validateCreateGame.js';
import { EditGameSchema } from '../utils/validators/validateEditGame.js';
import { BaseService } from './baseService.js';

export default new BaseService(Game, CreateGameSchema, EditGameSchema);
// export default class GameServices {
//   public static getById(gameId: string) {
//     return Game.findById(gameId);
//   }
//   public static getAll() {
//     return Game.find();
//   }
//   public static async createGame(gameInput: unknown) {
//     const parsed = await CreateGameSchema.safeParseAsync(gameInput);
//     if (!parsed.success) {
//       throw new HttpError(400, parsed.error.issues.map((i) => i.message).join(', '));
//     }
//     const parsedData = parsed.data;
//     const newGame = Game.create(parsedData);
//     return newGame;
//   }
//   public static async editGame(gameInput: unknown, gameId: string) {
//     const parsed = await CreateGameSchema.safeParseAsync(gameInput);
//     if (!parsed.success) {
//       throw new HttpError(400, parsed.error.issues.map((i) => i.message).join(', '));
//     }
//     const parsedData = parsed.data;
//     const updatedGame = Game.findByIdAndUpdate(gameId, parsedData, {
//       new: true,
//       runValidators: true,
//     });
//     return updatedGame;
//   }
//   public static async deleteGame(gameId: string) {
//     return Game.findByIdAndDelete(gameId);
//   }
// }
