import { User } from "../social feed/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Like } from "./like.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts, {onDelete: 'CASCADE'})
  user: User;

  @OneToMany(() => Like, like => like.post)
  likes: Like[];
}