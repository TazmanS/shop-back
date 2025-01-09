import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RedisService } from '../redis/redis.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private configService: ConfigService,
  ) {}

  async validateUser({ email, password }: SignInDto): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id, email: user.email };
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    await this.redisService.setValue(
      user.id.toString(),
      JSON.stringify(user),
      this.configService.get('REDIS_TTL'),
    );

    return { access_token };
  }
}
