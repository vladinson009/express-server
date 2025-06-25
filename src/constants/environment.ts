// import type { Environment, EnvironmentConfigs } from './types/Constants.js';

import { Environment, EnvironmentConfigs } from '../types/Constants';

const configs: EnvironmentConfigs = {
  development: {
    DB_CONNECTION_STRING: 'mongodb://localhost:27017/dog-hills',
    SECRET_TOKEN: 'alaBaLa',
    HASH_ROUNDS: 8,
  },
  production: {
    DB_CONNECTION_STRING:
      process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/dog-hills',
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'alaBaLa',
    HASH_ROUNDS: Number(process.env.HASH_ROUNDS) || 8,
  },
};
const environment: Environment =
  (process.env.NODE_ENV as Environment) || 'development';

export default configs[environment];
