import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { countryType } from '../enum/country.enum';
import { SingleAlbumsEntity } from './singleAlbums.entity';

@Entity()
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brandName: string;

  @Column({
    type: 'enum',
    enum: countryType,
  })
  country: countryType;

  @OneToMany(() => SingleAlbumsEntity, (singleAlbum) => singleAlbum.brand)
  singleAlbum: SingleAlbumsEntity[];
}
