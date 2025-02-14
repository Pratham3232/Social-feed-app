import { Controller, Post, Body, Get } from '@nestjs/common';
import { PostService } from './posts.service';

@Controller('/')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('getpost')
  GetPost(@Body() req) {
    return this.postService.getPost(req);
  }

  @Post('post')
  PostContent(@Body() req) {
    return this.postService.uploadPost(req);
  }
}