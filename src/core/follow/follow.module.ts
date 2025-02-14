import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../social feed/user.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { Follow } from '../../social feed/follow.entity';
import { ActivityWallService } from '../activities/activitywall.service';
import { Activity } from '../../social feed/activitywall.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow, Activity]),
  ],
  controllers: [FollowController],
  providers: [FollowService, ActivityWallService],
})
export class FollowModule {}