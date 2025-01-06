import { Controller, Get, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('keys')
  async getKeys() {
    const keys = await this.redisService.getAllKeys();
    return keys;
  }

  @Get('value/:key')
  async getValue(@Param('key') key: string) {
    const value = await this.redisService.getValue(key);
    return value;
  }

  @Get('ttl/:key')
  async getTTL(@Param('key') key: string) {
    const ttl = await this.redisService.getTTL(key);
    return ttl;
  }
}
