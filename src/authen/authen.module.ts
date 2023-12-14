import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AdminEntity } from 'src/common/entites/admin.entity';
import { AuthenController } from './authen.controller';
import { AuthenService } from './authen.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, '../../environments/local.env'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthenController],
  providers: [AuthenService,AuthGuard],
  exports: [AuthenService],
})
export class AuthenModule {}
