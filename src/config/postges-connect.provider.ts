import { dataSourceOptions } from 'src/config/data-source';
import { DataSource } from 'typeorm';

export const PostgresConnectionProvider = {
  provide: DataSource,
  useFactory: async () => {
    let dataSource: DataSource;
    try {
      dataSource = new DataSource(dataSourceOptions);
      await dataSource.initialize();
    } catch (error) {
      console.error(error);
    }
    return dataSource;
  },
};
