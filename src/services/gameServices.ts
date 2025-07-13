// import { HttpError } from '../utils/errorParser.js';
import Game from '../models/Game.js';

import { CreateGameSchema } from '../utils/validators/validateCreateGame.js';
import { EditGameSchema } from '../utils/validators/validateEditGame.js';
import { BaseService } from './baseService.js';

export default new BaseService(Game, CreateGameSchema, EditGameSchema);
