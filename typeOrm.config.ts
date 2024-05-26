import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './src/modules/users/entities/user.entity';
import { CreateUserTable1716368016745 } from './src/migrations/1716368016745-create_user_table';
import { AddedDrivingLicense1716369593917 } from './src/migrations/1716369593917-added_driving_license';

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
  migrations: [CreateUserTable1716368016745, AddedDrivingLicense1716369593917],
  logging: true,
};

export default new DataSource(options);
