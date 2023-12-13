import { Global, Module } from '@nestjs/common';
import { PostgresConnectionProvider } from './postges-connect.provider';

@Global()
@Module({
  providers: [PostgresConnectionProvider],
  exports: [PostgresConnectionProvider],
})
export class DatabaseConnectionModuleModule {}
