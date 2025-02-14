import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../social feed/user.entity';
import { Post } from '../social feed/posts.entity';
import { Block } from '../social feed/block.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Block]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}