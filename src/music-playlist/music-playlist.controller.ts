import { Controller, Get, Param } from '@nestjs/common';
import { GetMusicPlaylistDTO } from './dto/get-music-playlist.dto';
import { MusicPlaylistService } from './music-playlist.service';

@Controller('music-playlist')
export class MusicPlaylistController {
  constructor(private readonly musicPlaylistService: MusicPlaylistService) {}

  @Get('country/:countryType')
  findByCountry(@Param() param: GetMusicPlaylistDTO) {
    return this.musicPlaylistService.findByCountry(param);
  }

  @Get('genre/:genreType')
  findByGenre(@Param() param: GetMusicPlaylistDTO) {
    return this.musicPlaylistService.findByGenre(param);
  }

  @Get('song/:songName')
  findBySongName(@Param() param: GetMusicPlaylistDTO) {
    return this.musicPlaylistService.findBySongName(param);
  }

  @Get('brand/:brandName')
  findByBrandName(@Param() param: GetMusicPlaylistDTO) {
    return this.musicPlaylistService.findByBrandName(param);
  }

  // @Post()
  // create(@Body() createMusicPlaylistDto: CreateMusicPlaylistDto) {
  //   return this.musicPlaylistService.create(createMusicPlaylistDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.musicPlaylistService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMusicPlaylistDto: UpdateMusicPlaylistDto,
  // ) {
  //   return this.musicPlaylistService.update(+id, updateMusicPlaylistDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.musicPlaylistService.remove(+id);
  // }
}
