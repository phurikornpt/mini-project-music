import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MusicGenreEntity } from './musicGenre.entity';
import { SingleAlbumsEntity } from './singleAlbums.entity';

@Entity()
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  songName: string;

  @ManyToOne(() => MusicGenreEntity, (music) => music.id)
  @JoinColumn()
  musicGenre: MusicGenreEntity;

  @ManyToOne(() => SingleAlbumsEntity, (singleAlbum) => singleAlbum.id)
  singleAlbum: SingleAlbumsEntity;
}
