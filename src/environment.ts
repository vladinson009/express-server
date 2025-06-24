import type { Environment, EnvironmentConfigs } from './types/Constants.js';

const configs: EnvironmentConfigs = {
  development: {
    DB_CONNECTION_STRING: 'mongodb://localhost:27017/dog-hills',
  },
  production: {
    DB_CONNECTION_STRING:
      process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/dog-hills',
  },
};
const environment: Environment =
  (process.env.NODE_ENV as Environment) || 'development';

export default configs[environment];
//
