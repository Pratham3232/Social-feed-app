import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.blockedUsers, {onDelete: 'CASCADE'})
  blocker: User;

  @ManyToOne(() => User, user => user.blockedBy, {onDelete: 'CASCADE'})
  blocked: User;
}