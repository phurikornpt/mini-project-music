import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { AdminEntity } from 'src/common/entites/admin.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/create-authen.dto';

@Injectable()
export class AuthenService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private jwtService: JwtService,
  ) {}
  async signIn(body: SignInDto) {
    const encrypPass = sha256(body.password);
    const admin = await this.adminRepository.findOne({
      where: {
        username: body.username,
        password: encrypPass,
      },
    });
    if (admin === null) throw new UnauthorizedException();

    const payload = { id: admin.id, username: admin.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

function sha256(input: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}
