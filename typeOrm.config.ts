import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './src/modules/users/entities/user.entity';

dotenv.config();

const configService = new ConfigService();

const options: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: parseInt(configService.get('POSTGRES_PORT')),
  username: configService.get('POSTGRES_USER'),
  database: configService.get('POSTGRES_DB'),
  password: configService.get('POSTGRES_PASSWORD'),
  entities: [User],
  migrations: [],
  logging: true,
};

export default new DataSource(options);
