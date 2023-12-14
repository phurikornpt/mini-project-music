import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthenService } from './authen.service';
import { SignInDto } from './dto/create-authen.dto';

@Controller('authen')
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @Post()
  signIn(@Body() body: SignInDto) {
    return this.authenService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  testLogin(@Request() req) {
    return req.user;
  }
}
