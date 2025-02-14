import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './social feed/user.entity';
import { Like } from './social feed/like.entity';
import { Post } from './social feed/posts.entity';
import { Follow } from './social feed/follow.entity';
import { Block } from './social feed/block.entity';
import { Activity } from './social feed/activitywall.entity';
import { AuthModule } from './auth/auth.module';
import { LikeModule } from './core/like/like.module';
import { FollowModule } from './core/follow/follow.module';
import { BlockModule } from './core/block/block.module';
import { ActityModule } from './core/activities/activitywall.module';
import { UserModule } from './users/user.module';
import { PostModule } from './core/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'social_feed',
      entities: [User, Like, Post, Follow, Block, Activity], // Add all your entities here
      synchronize: true, // Automatically sync database schema (for development only)
    }),
    AuthModule,
    PostModule,
    LikeModule,
    FollowModule,
    BlockModule,
    ActityModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
