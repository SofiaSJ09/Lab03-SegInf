import { DataSource } from 'typeorm';
import { Risk } from './src/risks/entities/risk.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data.sqlite',
  synchronize: true,
  logging: false,
  entities: [Risk],
  migrations: [],
  subscribers: [],
});
