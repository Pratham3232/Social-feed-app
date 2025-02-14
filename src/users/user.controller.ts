import { Controller, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('user/content')
  FetchUserFeedContent(@Body() req) {
    return this.userService.getContentForUser(req);
  }
}