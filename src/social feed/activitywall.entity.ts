import { Post } from "../social feed/posts.entity";
import { User } from "../social feed/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ActivityType {
    POST = 'POST',
    FOLLOW = 'FOLLOW',
    LIKE = 'LIKE'
  }
  
  @Entity()
  export class Activity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'enum', enum: ActivityType })
    type: ActivityType;
  
    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    actor: User;
  
    @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
    targetUser?: User;
  
    @ManyToOne(() => Post, { nullable: true })
    targetPost?: Post;
  
    @CreateDateColumn()
    timestamp: Date;
  }