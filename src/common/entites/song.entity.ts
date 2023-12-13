import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BrandEntity } from './brand.entity';
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

  @ManyToOne(() => SingleAlbumsEntity, (singleAlbum) => singleAlbum.id, {
    cascade: true,
  })
  singleAlbum: SingleAlbumsEntity;

//   @ManyToOne(() => BrandEntity)
//   @JoinColumn()
//   brand: BrandEntity;
}
