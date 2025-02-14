import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../../social feed/like.entity';
import { User } from '../../social feed/user.entity';
import { Post } from '../../social feed/posts.entity';
import { ActivityType } from 'src/social feed/activitywall.entity';
import { ActivityWallService } from '../activities/activitywall.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly activityWallService: ActivityWallService
  ) {}

  async getLike(body): Promise<any> {
    const post = await this.postRepository.findOne({ where: { id: body.postId }});

    if (!post) {
      throw new UnauthorizedException('Invalid Post id');
    }

    const likes = await this.likeRepository.find({ where: { post: post }, relations: ['user'] });

    const users = likes.map(like => {
        return like.user.username
    });

    return {
        status: true,
        response: users
    }
  }

  async updateLike(body): Promise<any> {
    const like = new Like();

    const user = await this.usersRepository.findOne({ where: { id: body.UserId } });
    const post = await this.postRepository.findOne({ where: { id: body.PostId } , relations: ['user'],});

    if (!user || !post) {
      throw new UnauthorizedException('Invalid user or Post');
    }

    if(post.user?.id == body.UserId) {
        throw new ConflictException('You cannot like your own post');
    }

    const likeExists = await this.likeRepository.findOne({ where: { user: user, post:post } });

    if(likeExists) {
        throw new ConflictException('You have already liked this post');
    }

    like.user = user;
    like.post = post;  

    await this.likeRepository.save(like);

    await this.activityWallService.updateActivity({
        user: user,
        activity: ActivityType.LIKE,
        post: post,
        contentOwner: post.user
    })

    return {
        status: true,
        message: "Post liked successfully"
    };
  }
}