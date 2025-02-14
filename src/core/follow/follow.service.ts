import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../social feed/user.entity';
import { Follow } from '../../social feed/follow.entity';
import { ActivityWallService } from '../activities/activitywall.service';
import { ActivityType } from '../../social feed/activitywall.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly activityWallService: ActivityWallService
  ) {}

  async updateFollow(body): Promise<any> {

    if(body.userId === body.followId) {
        throw new ConflictException('You cannot follow yourself');
    }

    const user = await this.usersRepository.findOne({ where: { id: body.userId } });

    if (!user) {
      throw new UnauthorizedException('Invalid user id');
    }   

    const followUser = await this.usersRepository.findOne({ where: { id: body.followId } });

    if(!followUser) {
        throw new UnauthorizedException('Invalid follow id');
    }

    const followExists = await this.followRepository.findOne({ where: { follower: user, following: followUser } });

    if(followExists) {
        throw new ConflictException('You have already followed this user'); 
    }

    await this.followRepository.save({
        follower: user,
        following: followUser
    });

    await this.activityWallService.updateActivity({
            follower: user,
            activity: ActivityType.FOLLOW,
            followed: followUser
        })
    

    return {
        status: "success",
        message: "Followed successfully"
    }
  }
}