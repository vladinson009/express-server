import { cardsPath } from '../constants/routeConstants.js';
import CardServices from '../services/cardServices.js';
import { createCrudController } from './abstractCrudController.js';

export default createCrudController({
  paths: cardsPath,
  paramName: 'cardId',
  service: CardServices,
});
