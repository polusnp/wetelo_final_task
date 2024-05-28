import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './src/modules/users/entities/user.entity';
import { Ad } from './src/modules/ads/entities/ads.entity';
import { CreateUsersAdsTables1716925486790 } from './src/migrations/1716925486790-create_users_ads_tables';

dotenv.config();

const configService = new ConfigService();

const options: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: parseInt(configService.get('POSTGRES_PORT')),
  username: configService.get('POSTGRES_USER'),
  database: configService.get('POSTGRES_DB'),
  password: configService.get('POSTGRES_PASSWORD'),
  entities: [User, Ad],
  migrations: [CreateUsersAdsTables1716925486790],
  logging: true,
};

export default new DataSource(options);
