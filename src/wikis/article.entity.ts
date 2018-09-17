import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Unique } from 'typeorm';
import { Users } from '../users/users.entity';
import { Wikis } from './wikis.entity';
import { Asset } from '../upload/asset.entity';

@Entity()
@Unique(['title', 'wiki', 'state'])
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(type => Users, item => item.email)
  @JoinColumn()
  createBy: Users;

  @ManyToOne(type => Wikis, item => item.id)
  @JoinColumn()
  wiki: Wikis;

  @Column('datetime')
  createTime: Date;

  @OneToMany(type => Asset, item => item.id)
  @JoinColumn()
  assets: Asset;

  @Column({
    default: 0,
  })
  state: number;

  @Column({
    default: 0,
  })
  commitTime: number;

  @Column({
    nullable: true,
  })
  commitMessage: string;
}