// import { HttpError } from '../utils/errorParser.js';
import Category from '../models/Category.js';

import { CreateCategorySchema } from '../utils/validators/validateCreateCategory.js';
import { EditCategorySchema } from '../utils/validators/validateEditCategory.js';
import { BaseService } from './baseService.js';

export default new BaseService(Category, CreateCategorySchema, EditCategorySchema);
