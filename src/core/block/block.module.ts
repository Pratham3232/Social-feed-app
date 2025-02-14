import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../social feed/user.entity';
import { Block } from '../../social feed/block.entity';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Block]),
  ],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}