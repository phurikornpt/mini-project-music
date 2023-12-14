import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { singleAlbumType } from '../enum/singleAlbums.enum';
import { BrandEntity } from './brand.entity';
import { SongEntity } from './song.entity';

@Entity()
export class SingleAlbumsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: singleAlbumType,
  })
  typeSingleAlbums: singleAlbumType;

  @ManyToOne(() => BrandEntity, (brand) => brand.id, { cascade: true })
  @JoinColumn()
  brand: BrandEntity;

  @OneToMany(() => SongEntity, (song) => song.singleAlbum)
  song: SongEntity[];
}
