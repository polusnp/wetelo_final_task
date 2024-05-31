import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ad } from '../../ads/entities/ads.entity';
import { UserRole } from '../../../common/enums/usersRole.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public phone: string;

  @Column()
  public password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  public role: UserRole;

  @Column({ default: false })
  public isVerified: boolean;

  @OneToMany(() => Ad, (ad) => ad.user)
  public ads: Ad[];
}
