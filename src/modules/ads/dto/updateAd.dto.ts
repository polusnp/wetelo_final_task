import { PartialType } from '@nestjs/mapped-types';
import { CreateAdDto } from './createAd.dto';

export class UpdateAdDto extends PartialType(CreateAdDto) {}
