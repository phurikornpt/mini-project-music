import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/authen/auth.guard';
import {
  CreateBrandDTO,
  CreateSingleAlbumDTO,
  CreateSong,
} from './dto/create-music-playlist.dto';
import {
  DeleteSingleAlbumDTO,
  DeleteSingleSongArrayDTO,
} from './dto/delete-music-playlist.dto';
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

  /* ----------------------- Admin Route ----------------------- */
  @UseGuards(AuthGuard)
  @Post('brand')
  createBrand(@Body() Body: CreateBrandDTO) {
    return this.musicPlaylistService.createBrand(Body);
  }
  @UseGuards(AuthGuard)
  @Post('sigle-album')
  createSigleAlbum(@Body() Body: CreateSingleAlbumDTO) {
    return this.musicPlaylistService.createSigleAlbum(Body);
  }
  @UseGuards(AuthGuard)
  @Post('song')
  createSong(@Body() Body: CreateSong) {
    return this.musicPlaylistService.createSong(Body);
  }
  @UseGuards(AuthGuard)
  @Delete('sigle-album-song')
  deleteSigleAlbumSong(@Body() Body: DeleteSingleSongArrayDTO) {
    return this.musicPlaylistService.deleteSigleAlbumSong(Body);
  }
  @UseGuards(AuthGuard)
  @Delete('sigle-album/:singleAlbumID')
  deleteSigleAlbum(@Param() param: DeleteSingleAlbumDTO) {
    return this.musicPlaylistService.deleteSigleAlbum(param);
  }
}
