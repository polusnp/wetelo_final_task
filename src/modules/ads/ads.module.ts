import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ad } from './entities/ads.entity';
import { AdsService } from './services/ads.servise';
import { AdsController } from './controllers/ads.controllers';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/services/users.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ad, User]), MailModule],
  controllers: [AdsController],
  providers: [AdsService, UsersService],
  exports: [TypeOrmModule, AdsService],
})
export class AdModule {}
