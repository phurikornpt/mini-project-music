import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { CreateAuthenDto } from './dto/create-authen.dto';
import { UpdateAuthenDto } from './dto/update-authen.dto';

@Controller('authen')
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @Post()
  create(@Body() createAuthenDto: CreateAuthenDto) {
    return this.authenService.create(createAuthenDto);
  }

  @Get()
  findAll() {
    return this.authenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenDto: UpdateAuthenDto) {
    return this.authenService.update(+id, updateAuthenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenService.remove(+id);
  }
}
