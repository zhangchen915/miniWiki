import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Wikis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wikiName: string;

  @ManyToOne(type => Users, user => user.email)
  @JoinColumn()
  createBy: Users;

  @Column('datetime')
  createTime;
}