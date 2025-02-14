import { Controller, Body, Get } from '@nestjs/common';
import { ActivityWallService } from './activitywall.service';

@Controller('/')
export class ActivityWallController {
  constructor(private activityWallService: ActivityWallService) {}

  @Get('activitywall')
  ActivityWall(@Body() req) {
    return this.activityWallService.getActivity(req);
  }
}