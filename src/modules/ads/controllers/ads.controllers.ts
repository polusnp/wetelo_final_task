import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Request,
  UseGuards,
  Post,
  Put,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { Ad } from '../entities/ads.entity';
import { AdsService } from '../services/ads.servise';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { CreateAdDto } from '../dto/createAd.dto';
import { UpdateAdDto } from '../dto/updateAd.dto';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/usersRole.enum';

@Controller('ads')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get()
  async findAll(): Promise<Ad[]> {
    return this.adsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Ad> {
    return this.adsService.findById(id);
  }

  @Post()
  @Roles(UserRole.USER, UserRole.ADMIN)
  async create(
    @Body() createAdDto: CreateAdDto,
    @Request() req: any,
  ): Promise<Ad> {
    if (!req.user.isVerified) {
      throw new UnauthorizedException('User is not verified by an admin');
    }
    return this.adsService.create(createAdDto, req.user.id);
  }

  @Put(':id')
  @Roles(UserRole.USER)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdDto: UpdateAdDto,
    @Request() req: any,
  ): Promise<Ad> {
    if (!req.user.isVerified) {
      throw new UnauthorizedException('User is not verified by an admin');
    }
    return this.adsService.update(id, updateAdDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ): Promise<void> {
    if (!req.user.isVerified) {
      throw new UnauthorizedException('User is not verified by an admin');
    }
    return this.adsService.remove(id);
  }
}
