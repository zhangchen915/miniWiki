import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Wikis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wikiName: string;

  @OneToOne(type => Users, user => user.email)
  @JoinColumn()
  createBy: Users;

  @Column('datetime')
  createTime;
}