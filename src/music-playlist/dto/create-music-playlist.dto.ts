import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { countryType } from 'src/common/enum/country.enum';
import { singleAlbumType } from 'src/common/enum/singleAlbums.enum';

export class CreateBrandDTO {
  @IsNotEmpty()
  brandName: string;

  @IsNotEmpty()
  @IsEnum(countryType)
  countryType: countryType;
}

export class CreateSingleAlbumDTO {
  @IsNotEmpty()
  @IsNumber()
  brandID: number;

  @IsNotEmpty()
  @IsString()
  singleAlbumName: string;

  @IsNotEmpty()
  @IsEnum(singleAlbumType)
  typeSingleAlbum: singleAlbumType;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SongArrayDTO)
  singleAlbum: SongArrayDTO[];
}
export class CreateSong {
  // @IsNotEmpty()
  @IsNumber()
  singleAlbumID: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SongArrayDTO)
  song: SongArrayDTO[];
}

export class SongArrayDTO {
  @IsNotEmpty()
  @IsString()
  songName: string;

  @IsNotEmpty()
  @IsNumber()
  musicGenre: number;
}
