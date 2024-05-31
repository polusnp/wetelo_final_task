import { InjectRepository } from '@nestjs/typeorm';
import { Ad } from '../entities/ads.entity';
import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateAdDto } from '../dto/createAd.dto';
import { UpdateAdDto } from '../dto/updateAd.dto';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad)
    private adRepository: Repository<Ad>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Ad[]> {
    return this.adRepository.find({ relations: ['user'] });
  }

  async findById(id: number): Promise<Ad> {
    return this.adRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async findByUserName(userName: string): Promise<Ad[]> {
    const user = await this.userRepository.findOne({
      where: { name: userName },
    });
    if (!user) {
      throw new NotFoundException(`${userName} do not have ads`);
    }
    return this.adRepository.find({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
  }

  async create(createAdDto: CreateAdDto, userId: number): Promise<Ad> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user.isVerified) {
      throw new UnauthorizedException('User is not verified by an admin');
    }
    const ad = this.adRepository.create({ ...createAdDto, user });
    return this.adRepository.save(ad);
  }

  async update(id: number, updateAdDto: UpdateAdDto): Promise<Ad> {
    const ad = await this.adRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!ad.user.isVerified) {
      throw new UnauthorizedException('User is not verified by an admin');
    }
    await this.adRepository.update(id, updateAdDto);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const ad = await this.adRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!ad.user.isVerified) {
      throw new UnauthorizedException('User is not verified by an admin');
    }
    await this.adRepository.delete(id);
  }
}
