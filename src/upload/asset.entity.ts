import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';
import { Article } from '../wikis/article.entity';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mime: string;

  @Column()
  size: number;

  @ManyToOne(type => Users, user => user.email)
  @JoinColumn()
  uploadBy: Users;

  @ManyToOne(type => Article, user => user.id)
  @JoinColumn()
  article: Article;

  @Column('datetime')
  uploadTime: Date;
}