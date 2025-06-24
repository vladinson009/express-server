interface EnvironmentValue {
  DB_CONNECTION_STRING: string;
}
export type Environment = 'development' | 'production';
export interface EnvironmentConfigs {
  [key: string]: EnvironmentValue;
}
