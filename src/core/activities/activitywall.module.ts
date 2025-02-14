import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../social feed/user.entity';
import { Activity } from 'src/social feed/activitywall.entity';
import { ActivityWallController } from './activitywall.controller';
import { ActivityWallService } from './activitywall.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Activity]),
  ],
  controllers: [ActivityWallController],
  providers: [ActivityWallService],
})
export class ActityModule {}