import { categoriesPath } from '../constants/routeConstants.js';
import CategoryServices from '../services/categoryServices.js';
import { createCrudController } from './abstractCrudController.js';

export default createCrudController({
  paths: categoriesPath,
  paramName: 'categoryId',
  service: CategoryServices,
});
