import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Ad {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column('double')
  public price: number;

  @ManyToOne(() => User, (user) => user.ads)
  public user: User;
}
