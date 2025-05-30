import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './post.service';
import { CreatePostDto, LoginDto, RegisterDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('api')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.postService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.postService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('post')
  async create(@Body() dto: CreatePostDto, @Req() req) {
    console.log(req.user.userId);
    return this.postService.create(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(
    @Req() req,
    @Query('platform') platform: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.postService.findAll(req.user.userId, platform, +page, +limit);
  }
}
