import { gamesPath } from '../constants/routeConstants.js';
import GameServices from '../services/gameServices.js';
import { createCrudController } from './abstractCrudController.js';

export default createCrudController({
  paths: gamesPath,
  paramName: 'gameId',
  service: GameServices,
});
