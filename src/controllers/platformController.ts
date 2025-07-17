import { platformsPath } from '../constants/routeConstants.js';
import PlatformServices from '../services/platformServices.js';
import { createCrudController } from './abstractCrudController.js';

export default createCrudController({
  paths: platformsPath,
  paramName: 'platformId',
  service: PlatformServices,
});
