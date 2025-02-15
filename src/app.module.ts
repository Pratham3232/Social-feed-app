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
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST, // Use Railway's PGHOST, not DATABASE_URL
      port: parseInt(process.env.PGPORT|| '5432'),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      ssl: true, // Required for Railway's public network:cite[4]:cite[6]
      extra: {
        ssl: {
          rejectUnauthorized: false, // Required for Railway’s SSL:cite[4]
        },
      },
      entities: [User, Like, Post, Follow, Block, Activity], // Add all your entities here
      synchronize: true, // Automatically sync database schema (for development only)
    }),
    AuthModule,
    PostModule,
    LikeModule,
    FollowModule,
    BlockModule,
    ActityModule,
    UserModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
