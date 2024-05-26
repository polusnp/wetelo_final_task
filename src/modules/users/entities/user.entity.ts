import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public first_name: string;

  @Column()
  public last_name: string;

  @Column()
  public age: number;

  @Column()
  public driving_license: boolean;

  @Column()
  public email: string;

  @Column()
  public password: string;
}
