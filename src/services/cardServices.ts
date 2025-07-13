import Card from '../models/Card.js';

import { EditCardSchema } from '../utils/validators/validateEditCard.js';
import { CreateCardSchema } from '../utils/validators/validateCreateCard.js';
import { BaseService } from './baseService.js';

export default new BaseService(Card, CreateCardSchema, EditCardSchema);
