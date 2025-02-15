import { Controller, Post, Body } from '@nestjs/common';
import { BlockService } from './block.service';

@Controller('/')
export class BlockController {
  constructor(private blockService: BlockService) {}

  @Post('block')
  Block(@Body() req) {
    return this.blockService.updateBlock(req);
  }
}