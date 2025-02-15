import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Post } from './posts.entity';


@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.likes, {onDelete: 'CASCADE'})
  user: User;

  @ManyToOne(() => Post, post => post.likes, {onDelete: 'CASCADE'})
  post: Post;
}