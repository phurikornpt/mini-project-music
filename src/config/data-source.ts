import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'music',
  username: 'postgres',
  password: '1234',
  synchronize: false,
  entities: [path.resolve(__dirname, '../common/entites/*.entity.{ts,js}')],
  migrations: ['./migrations/*{.ts,.js}'],
  migrationsTableName: 'custom_migration_table',
};

export default new DataSource(dataSourceOptions);
