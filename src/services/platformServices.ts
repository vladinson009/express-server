// import { HttpError } from '../utils/errorParser.js';
import Platform from '../models/Platform.js';

import { CreatePlatformSchema } from '../utils/validators/validateCreatePlatform.js';
import { EditPlatformSchema } from '../utils/validators/validateEditPlatform.js';
import { BaseService } from './baseService.js';

export default new BaseService(Platform, CreatePlatformSchema, EditPlatformSchema);
