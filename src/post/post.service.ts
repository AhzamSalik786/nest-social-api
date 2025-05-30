/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/create-post.dto';
import { LoginDto } from './dto/create-post.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = this.userRepo.create({
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
    });
    await this.userRepo.save(user);
    return { message: 'User registered successfully' };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ sub: user.id });
    return { access_token: token };
  }

  async create(dto: CreatePostDto, userId: number) {
    console.log(userId);
    const post = this.postRepo.create({
      ...dto,
      user: { id: userId },
    });
    return await this.postRepo.save(post);
  }

  async findAll(userId: number, platform?: string, page = 1, limit = 10) {
    const query = this.postRepo
      .createQueryBuilder('post')
      .where('post.user_id = :userId', { userId })
      .orderBy('post.posted_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (platform) {
      query.andWhere('post.platform = :platform', { platform });
    }

    return await query.getMany();
  }
}
