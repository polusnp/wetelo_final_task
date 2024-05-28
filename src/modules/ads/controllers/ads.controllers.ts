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
} from '@nestjs/common';
import { Ad } from '../entities/ads.entity';
import { AdsService } from '../services/ads.servise';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { CreateAdDto } from '../dto/createAd.dto';
import { UpdateAdDto } from '../dto/updateAd.dto';

@Controller('ads')
@UseGuards(JwtAuthGuard)
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

  @Get('username/:username')
  async findByUserName(@Param('userName') userName: string): Promise<Ad[]> {
    return this.adsService.findByUserName(userName);
  }

  @Post()
  async create(
    @Body() createAdDto: CreateAdDto,
    @Request() req: any,
  ): Promise<Ad> {
    return this.adsService.create(createAdDto, req.user.id);
  }

  @Put()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdDto: UpdateAdDto,
  ): Promise<Ad> {
    return this.adsService.update(id, updateAdDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.adsService.remove(id);
  }
}
