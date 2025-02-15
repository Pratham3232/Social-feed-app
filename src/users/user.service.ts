import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../social feed/user.entity';
import { Post } from '../social feed/posts.entity';
import { Block } from '../social feed/block.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  async getContentForUser(body): Promise<any> {
    const content = await this.postRepository.find( {relations:['user', 'likes']});

    const user = await this.usersRepository.findOne({ where: { id: body.UserId } });

    if (!user) {
      throw new UnauthorizedException('Invalid user id');
    } 

    const blockedUsers = await this.blockRepository.find({ where: { blocker: user }, relations: ['blocked'] });
    const blockedByUsers = await this.blockRepository.find({ where: { blocked: user }, relations: ['blocker'] });

    const blockedUserIds = new Set();


    blockedUsers.forEach(blockedUser => {
      blockedUserIds.add(blockedUser.blocked.id);
    });

    blockedByUsers.forEach(blockedByUser => {
      blockedUserIds.add(blockedByUser.blocker.id);
    });

    var filteredContent = content.filter(post => {
      return !blockedUserIds.has(post.user.id);
    });

    var finalContentData = filteredContent.map( post => {
      return {
        postId: post.id,
        content: post.content,
        likes: post.likes.length
      }
    })

    return finalContentData;
  }
}