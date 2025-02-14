import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../social feed/posts.entity';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { User } from '../../social feed/user.entity';
import { ActivityWallService } from '../../core/activities/activitywall.service';
import { Activity } from '../../social feed/activitywall.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Activity])
  ],
  controllers: [PostController],
  providers: [PostService, ActivityWallService],
})
export class PostModule {}