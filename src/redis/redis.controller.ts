import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('redis')
@ApiTags('Redis')
@UseGuards(JwtGuard)
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('keys')
  @ApiOperation({ summary: 'Get all keys' })
  async getKeys() {
    const keys = await this.redisService.getAllKeys();
    return keys;
  }

  @Get('value/:key')
  @ApiOperation({ summary: 'Get value by key' })
  async getValue(@Param('key') key: string) {
    const value = await this.redisService.getValue(key);
    return value;
  }

  @Get('ttl/:key')
  @ApiOperation({ summary: 'Get ttl by key' })
  async getTTL(@Param('key') key: string) {
    const ttl = await this.redisService.getTTL(key);
    return ttl;
  }
}
