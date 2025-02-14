import { Controller, Post, Body, Get } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('/')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Get('getlike')
  GetLike(@Body() req) {
    return this.likeService.getLike(req);
  }

  @Post('like')
  UpdateLike(@Body() req) {
    return this.likeService.updateLike(req);
  }
}