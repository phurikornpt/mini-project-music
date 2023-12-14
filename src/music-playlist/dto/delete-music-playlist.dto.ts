import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  ValidateNested,
} from 'class-validator';

export class DeleteSingleAlbumDTO {
  @IsNumberString()
  singleAlbumID: number;
}
export class DeleteSingleSongArrayDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DeleteSongDTO)
  songList: DeleteSongDTO[];
}
export class DeleteSongDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
