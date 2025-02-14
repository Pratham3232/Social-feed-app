import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../social feed/user.entity';
import { Post } from '../social feed/posts.entity';
import { Block } from '../social feed/block.entity';
import { Like } from '../social feed/like.entity';

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
    console.log(content);

    const user = await this.usersRepository.findOne({ where: { id: body.UserId } });

    const blockedUsers = await this.blockRepository.find({ where: { blocker: body.UserId } });
    const blockedByUsers = await this.blockRepository.find({ where: { blocked: body.UserId } });

    console.log(blockedUsers, blockedByUsers);

    // const blockedUser = await ;
    
  }
}