import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { RedisService } from '../../redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private redisService: RedisService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req) => req.cookies['access_token'],
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.redisService.getValue(payload.sub.toString());
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }
}
