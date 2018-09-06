import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    length: 150,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  // @Column()
  // githubId: string;
  //
  // @Column()
  // githubToken: string;
  //
  // @Column()
  // githubExpress: string;

  @Column({
    default: 0,
  })
  role: number;

  @Column('datetime')
  registerTime;

  @Column({
    length: 15,
  })
  registerIP: string;

  @Column('datetime')
  lastLogin: boolean;
}