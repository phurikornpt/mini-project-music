import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenModule } from './authen/authen.module';
import { DatabaseConnectionModuleModule } from './config/database-connection.module';
import { MusicPlaylistModule } from './music-playlist/music-playlist.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, '../environments/local.env'),
    }),
    DatabaseConnectionModuleModule,
    MusicPlaylistModule,
    AuthenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
