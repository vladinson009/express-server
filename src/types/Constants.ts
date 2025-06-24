interface EnvironmentValue {
  DB_CONNECTION_STRING: string;
  SECRET_TOKEN: string;
  HASH_ROUNDS: number;
}
export type Environment = 'development' | 'production';
export interface EnvironmentConfigs {
  [key: string]: EnvironmentValue;
}
