import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../social feed/user.entity';
import { Activity, ActivityType } from '../../social feed/activitywall.entity';

@Injectable()
export class ActivityWallService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getActivity(body): Promise<any> {
    const activityWalll = await this.activityRepository.find({relations: ['actor', 'targetUser', 'targetPost']});

    const activities: string[] = [];

    for(const activity of activityWalll) {
        if(activity.type === ActivityType.POST) {
            var temp = `User ${activity.actor.username} posted a new post with content ${activity?.targetPost?.content}`;
            activities.push(temp);
        }else if(activity.type === ActivityType.LIKE) {
            var temp = `User ${activity.actor.username} liked a post by ${activity?.targetUser?.username}`;
            activities.push(temp);
        }else if(activity.type === ActivityType.FOLLOW) {
            var temp = `User ${activity.actor.username} followed ${activity?.targetUser?.username}`;
            activities.push(temp);
        }
    }

    return activities
  }

  async updateActivity(body): Promise<any> {
    const activity = new Activity();
    if(body.activity === ActivityType.POST) {
        activity.type = body.activity;
        activity.actor = body.user;
        activity.targetPost = body.post;
    }else if (body.activity === ActivityType.LIKE) {
        activity.type = body.activity;
        activity.actor = body.user;
        activity.targetPost = body.post;
        activity.targetUser = body.contentOwner;
    }else if (body.activity === ActivityType.FOLLOW) {
        activity.type = body.activity;
        activity.actor = body.follower;
        activity.targetUser = body.followed;
    }
    return await this.activityRepository.save(activity);
  }
}