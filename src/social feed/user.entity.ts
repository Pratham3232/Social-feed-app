import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Post } from './posts.entity';
import { Like } from './like.entity';
import { Follow } from './follow.entity';
import { Block } from './block.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  OWNER = 'owner',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Post, post => post.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  posts: Post[];

  @OneToMany(() => Like, like => like.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  likes: Like[];

  @OneToMany(() => Follow, follow => follow.follower, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  followers: Follow[];

  @OneToMany(() => Follow, follow => follow.following, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  following: Follow[];

  @OneToMany(() => Block, block => block.blocker, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  blockedUsers: Block[];

  @OneToMany(() => Block, block => block.blocked, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  blockedBy: Block[];
}