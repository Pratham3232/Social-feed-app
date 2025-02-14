import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../../social feed/like.entity';
import { User } from '../../social feed/user.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { Post } from '../../social feed/posts.entity';
import { ActivityWallService } from '../activities/activitywall.service';
import { Activity } from '../../social feed/activitywall.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, User, Post, Activity]),
  ],
  controllers: [LikeController],
  providers: [LikeService, ActivityWallService],
})
export class LikeModule {}