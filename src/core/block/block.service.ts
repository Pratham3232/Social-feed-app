import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../social feed/user.entity';
import { Block } from '../../social feed/block.entity';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async updateBlock(body): Promise<any> {

    if(body.userId === body.blockId) {
        throw new ConflictException('You cannot block yourself');
    }

    const user = await this.usersRepository.findOne({ where: { id: body.userId } });

    if (!user) {
      throw new UnauthorizedException('Invalid user id');
    }   

    const blockUser = await this.usersRepository.findOne({ where: { id: body.blockId } });

    if(!blockUser) {
        throw new UnauthorizedException('Invalid block id');
    }

    const blockExists = await this.blockRepository.findOne({ where: { blocker: user, blocked: blockUser } });

    if(blockExists) {
        throw new ConflictException('You have already blocked this user'); 
    }

    await this.blockRepository.save({
        blocker: user,
        blocked: blockUser
    });

    return {
        status: "success",
        message: "Blocked successfully"
    }
  }
}