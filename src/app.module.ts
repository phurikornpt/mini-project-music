import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicPlaylistModule } from './music-playlist/music-playlist.module';
import { AuthenModule } from './authen/authen.module';
import { DatabaseConnectionModuleModule } from './config/database-connection.module';

@Module({
  imports: [DatabaseConnectionModuleModule,MusicPlaylistModule, AuthenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
