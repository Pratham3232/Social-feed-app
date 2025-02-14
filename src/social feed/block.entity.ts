import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.blockedUsers)
  blocker: User;

  @ManyToOne(() => User, user => user.blockedBy)
  blocked: User;
}