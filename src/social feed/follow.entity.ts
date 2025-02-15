import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.followers, {
    onDelete: 'CASCADE',
  })
  follower: User;

  @ManyToOne(() => User, user => user.following, {
    onDelete: 'CASCADE',
  })
  following: User;
}