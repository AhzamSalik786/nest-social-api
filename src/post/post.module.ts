import { Module } from '@nestjs/common';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guard/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    JwtModule.register({
      secret: 'jwt_secret_key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, JwtStrategy],
})
export class PostModule {}
