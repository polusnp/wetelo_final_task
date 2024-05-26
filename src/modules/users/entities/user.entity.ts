import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ad } from 'src/modules/ads/entities/ads.entity';

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

  @OneToMany(() => Ad, (ad) => ad.user)
  public ads: Ad[];
}
