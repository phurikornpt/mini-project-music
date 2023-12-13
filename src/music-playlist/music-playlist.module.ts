import { Module } from '@nestjs/common';
import { MusicPlaylistService } from './music-playlist.service';
import { MusicPlaylistController } from './music-playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from 'src/common/entites/brand.entity';
import { MusicGenreEntity } from 'src/common/entites/musicGenre.entity';
import { SingleAlbumsEntity } from 'src/common/entites/singleAlbums.entity';
import { SongEntity } from 'src/common/entites/song.entity';
@Module({
  imports:[TypeOrmModule.forFeature([BrandEntity,MusicGenreEntity,SingleAlbumsEntity,SongEntity])],
  controllers: [MusicPlaylistController],
  providers: [MusicPlaylistService],
})
export class MusicPlaylistModule {}
