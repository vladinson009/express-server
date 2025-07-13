import Card from '../models/Card.js';

import { EditCardSchema } from '../utils/validators/validateEditCard.js';
import { CreateCardSchema } from '../utils/validators/validateCreateCard.js';
import { BaseService } from './baseService.js';

export default new BaseService(Card, CreateCardSchema, EditCardSchema);
// export default class CardServices {
//   public static getById(cardId: string) {
//     return Card.findById(cardId);
//   }
//   public static getAll() {
//     return Card.find();
//   }
//   public static async createCard(cardInput: unknown) {
//     const parsed = await CreateCardSchema.safeParseAsync(cardInput);
//     if (!parsed.success) {
//       throw new HttpError(400, parsed.error.issues.map((i) => i.message).join(', '));
//     }
//     const parsedData = parsed.data;
//     const newCard = Card.create(parsedData);
//     return newCard;
//   }
//   public static async editCard(cardInput: unknown, cardId: string) {
//     const parsed = await EditCardSchema.safeParseAsync(cardInput);
//     if (!parsed.success) {
//       throw new HttpError(400, parsed.error.issues.map((i) => i.message).join(', '));
//     }
//     const parsedData = parsed.data;
//     const updatedCard = Card.findByIdAndUpdate(cardId, parsedData, {
//       new: true,
//       runValidators: true,
//     });
//     return updatedCard;
//   }
//   public static async deleteCard(cardId: string) {
//     return Card.findByIdAndDelete(cardId);
//   }
// }
