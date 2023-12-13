import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { countryTypeSearch } from 'src/common/enum/country.enum';

export class GetMusicPlaylistDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(countryTypeSearch)
  countryType: countryTypeSearch;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  genreType: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  songName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  brandName: string;
}


