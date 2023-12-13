import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'postgres',
  host: `localhost`,
  port: 5432,
  username: `postgres`,
  password: `1234`,
  database: `music`,
  entities: [path.resolve(__dirname, '../common/entites/*.entity.{ts,js}')],
  migrations: [path.resolve(__dirname,'../migrations/*.ts')],
  autoLoadEntities: true,
  synchronize: false,
};
export const connectionSource = new DataSource(config as DataSourceOptions);
