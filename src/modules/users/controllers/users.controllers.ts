import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
  UnauthorizedException,
  Request,
} from '@nestjs/common';

import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/usersRole.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findById(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    const user = await this.usersService.findById(id);
    if (req.user.role !== UserRole.ADMIN && req.user.id !== id) {
      throw new UnauthorizedException('You can only access your own profile');
    }
    return user;
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
