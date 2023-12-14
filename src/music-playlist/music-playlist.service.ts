import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from 'src/common/entites/brand.entity';
import { MusicGenreEntity } from 'src/common/entites/musicGenre.entity';
import { SingleAlbumsEntity } from 'src/common/entites/singleAlbums.entity';
import { SongEntity } from 'src/common/entites/song.entity';
import { countryTypeSearch } from 'src/common/enum/country.enum';
import { singleAlbumType } from 'src/common/enum/singleAlbums.enum';
import { Repository } from 'typeorm';
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

@Injectable()
export class MusicPlaylistService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
    @InjectRepository(SongEntity)
    private songRepository: Repository<SongEntity>,
    @InjectRepository(MusicGenreEntity)
    private musicGenreRepository: Repository<MusicGenreEntity>,
    @InjectRepository(SingleAlbumsEntity)
    private singleAlbumRepository: Repository<SingleAlbumsEntity>,
  ) {}

  async findByCountry(param: GetMusicPlaylistDTO) {
    let whereOption;
    if (param.countryType != countryTypeSearch.ALL) {
      whereOption = {
        singleAlbum: {
          brand: {
            country: param.countryType,
          },
        },
      };
    }
    return await this.songRepository.find({
      select: {
        songName: true,
        musicGenre: { genreName: true },
        singleAlbum: {
          name: true,
          typeSingleAlbums: true,
          brand: {
            brandName: true,
            country: true,
          },
        },
      },
      relations: {
        musicGenre: true,
        singleAlbum: {
          brand: true,
        },
      },
      where: whereOption,
    });
  }
  async findByGenre(param: GetMusicPlaylistDTO) {
    const isHave = await this.musicGenreRepository.findOneBy({
      genreName: param.genreType,
    });
    if (isHave === null) throw new BadRequestException("Don't have this Genre");

    return await this.songRepository.find({
      select: {
        songName: true,
        musicGenre: { genreName: true },
        singleAlbum: {
          typeSingleAlbums: true,
          name: true,
          brand: {
            brandName: true,
            country: true,
          },
        },
      },
      relations: {
        musicGenre: true,
        singleAlbum: {
          brand: true,
        },
      },
      where: {
        musicGenre: {
          genreName: param.genreType,
        },
      },
    });
  }

  async findBySongName(param: GetMusicPlaylistDTO) {
    const isHave = await this.songRepository.findOneBy({
      songName: param.songName,
    });
    if (isHave === null)
      throw new BadRequestException("Don't have this Song in data base");
    return await this.songRepository.find({
      select: {
        songName: true,
        musicGenre: { genreName: true },
        singleAlbum: {
          name: true,
          typeSingleAlbums: true,
          brand: {
            brandName: true,
            country: true,
          },
        },
      },
      relations: {
        musicGenre: true,
        singleAlbum: {
          brand: true,
        },
      },
      where: {
        songName: param.songName,
      },
    });
  }

  async findByBrandName(param: GetMusicPlaylistDTO) {
    const isHave = await this.brandRepository.findOneBy({
      brandName: param.brandName,
    });
    if (isHave === null)
      throw new BadRequestException("Don't have this Brand in data base");
    return await this.singleAlbumRepository.find({
      select: {
        brand: {
          brandName: true,
        },
        song: {
          songName: true,
        },
        typeSingleAlbums: true,
        name: true,
      },
      relations: {
        brand: true,
        song: true,
      },
      where: {
        brand: {
          brandName: param.brandName,
        },
      },
    });
  }

  async createBrand(body: CreateBrandDTO) {
    return await this.brandRepository.save({
      brandName: body.brandName,
      country: body.countryType,
    });
  }
  async createSigleAlbum(body: CreateSingleAlbumDTO) {
    const createSigleAlbum = await this.singleAlbumRepository.save({
      brand: {
        id: body.brandID,
      },
      name: body.singleAlbumName,
      typeSingleAlbums: body.typeSingleAlbum,
    });

    let newSong = [];
    const musicGenre = new MusicGenreEntity();
    const singleAlbum = new SingleAlbumsEntity();
    singleAlbum.id = createSigleAlbum.id;
    for (let i of body.singleAlbum) {
      musicGenre.id = i.musicGenre;
      newSong.push({
        songName: i.songName,
        musicGenre: musicGenre.id,
        singleAlbum: createSigleAlbum.id,
      });
    }
    return await this.songRepository.save(newSong);
  }

  async createSong(body: CreateSong) {
    const isSingleAlbum = await this.singleAlbumRepository.findOneBy({
      id: body.singleAlbumID,
    });
    if (
      isSingleAlbum.typeSingleAlbums === singleAlbumType.SINGLE &&
      body.song.length > 1
    ) {
      throw new BadRequestException('Single should be one!');
    }
    const newSong = [];
    body.song.forEach((x) => {
      newSong.push({
        singleAlbum: body.singleAlbumID,
        songName: x.songName,
        musicGenre: x.musicGenre,
      });
    });
    return await this.songRepository.save(newSong);
  }

  async deleteSigleAlbumSong(body: DeleteSingleSongArrayDTO) {
    const list = Object.values(body.songList);
    const deleteList = list.map((x) => x.id);
    return await this.songRepository.delete(deleteList);
  }
  async deleteSigleAlbum(param: DeleteSingleAlbumDTO) {
    await this.songRepository.delete({
      singleAlbum: await this.singleAlbumRepository.findOneBy({
        id: param.singleAlbumID,
      }),
    });
    return await this.singleAlbumRepository.delete(param.singleAlbumID);
  }
}
