import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../social feed/posts.entity';
import { User } from '../../social feed/user.entity';
import { ActivityWallService } from '../../core/activities/activitywall.service';
import { ActivityType } from '../../social feed/activitywall.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly activityWallService: ActivityWallService
  ) {}

  async getPost(body): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { id: body.userId } });

    if (!user) {
      throw new UnauthorizedException('Invalid user id');
    }

    const posts = await this.postRepository.find({ where: { user } })

    return await this.postRepository.find({ where: { user } });
  }

  async uploadPost(body): Promise<any> {
    const post = new Post();
    post.content = body.content;

    const user = await this.usersRepository.findOne({ where: { id: body.userId } });

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    post.user = user; // Associate the post with the user

    const savedPost = await this.postRepository.save(post);

    await this.activityWallService.updateActivity({
        user: user,
        activity: ActivityType.POST,
        post: savedPost
    })

    return {
        postId: savedPost.id,
        message: "Post uploaded successfully"
    };
  }
}