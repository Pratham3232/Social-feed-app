import { Controller, Post, Body } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('/')
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post('follow')
  Follow(@Body() req) {
    return this.followService.updateFollow(req);
  }
}