// import { HttpError } from '../utils/errorParser.js';
import Category from '../models/Category.js';

import { CreateCategorySchema } from '../utils/validators/validateCreateCategory.js';
import { BaseService } from './baseService.js';

export default new BaseService(Category, CreateCategorySchema);
// export default class CategoryServices {
//   public static getById(categoryId: string) {
//     return Category.findById(categoryId);
//   }
//   public static getAll() {
//     return Category.find();
//   }
//   public static async createCategory(categoryInput: unknown) {
//     const parsed = await CreateCategorySchema.safeParseAsync(categoryInput);
//     if (!parsed.success) {
//       throw new HttpError(400, parsed.error.issues.map((i) => i.message).join(', '));
//     }
//     const parsedData = parsed.data;
//     const newCategory = Category.create(parsedData);
//     return newCategory;
//   }
//   public static async editCategory(categoryInput: unknown, categoryId: string) {
//     const parsed = await CreateCategorySchema.safeParseAsync(categoryInput);
//     if (!parsed.success) {
//       throw new HttpError(400, parsed.error.issues.map((i) => i.message).join(', '));
//     }
//     const parsedData = parsed.data;
//     const updatedCategory = Category.findByIdAndUpdate(categoryId, parsedData, {
//       new: true,
//       runValidators: true,
//     });
//     return updatedCategory;
//   }
//   public static async deleteCategory(categoryId: string) {
//     return Category.findByIdAndDelete(categoryId);
//   }
// }
