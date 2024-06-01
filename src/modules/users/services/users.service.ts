import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserRole } from '../../../common/enums/usersRole.enum';
import { MailService } from '../../mail/services/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const usersCount = await this.userRepository.count();
    const role = usersCount === 0 ? UserRole.ADMIN : UserRole.USER;
    const isVerified = usersCount === 0 ? true : false;
    const newUser = this.userRepository.create({
      ...createUserDto,
      role,
      isVerified,
    });
    const savedUser = await this.userRepository.save(newUser);

    const admins = await this.userRepository.find({
      where: { role: UserRole.ADMIN },
    });
    const adminsEmails = admins.map((admin) => admin.email);

    for (const email of adminsEmails) {
      await this.mailService.sendVerificationEmail(email, savedUser.name);
    }

    return savedUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async verifyUser(id: number, adminId: number): Promise<User> {
    const admin = await this.userRepository.findOne({ where: { id: adminId } });
    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Only admins can verify users');
    }

    await this.userRepository.update(id, { isVerified: true });
    const verifiedUser = await this.findById(id);

    await this.mailService.sendAccountVerifiedEmail(verifiedUser.email);

    return verifiedUser;
  }

  async changeUserRole(
    userId: number,
    role: UserRole,
    adminId: number,
  ): Promise<User> {
    const admin = await this.userRepository.findOne({ where: { id: adminId } });
    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'Only the main admin can change user roles',
      );
    }

    const firstAdmin = await this.userRepository.findOne({
      where: { role: UserRole.ADMIN },
      order: { id: 'ASC' },
    });
    if (admin.id !== firstAdmin.id) {
      throw new UnauthorizedException(
        'Only the main admin can change user roles',
      );
    }

    await this.userRepository.update(userId, { role });
    return this.findById(userId);
  }
}
