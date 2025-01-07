import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor(private readonly config: ConfigService) {
    this.client = new Redis({
      host: this.config.get('REDIS_HOST'),
      port: this.config.get('REDIS_PORT'),
    });
  }

  async setValue(key: string, value: string, ttl: number) {
    await this.client.setex(key, ttl, value);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async delValue(key: string) {
    await this.client.del(key);
  }

  async getAllKeys(): Promise<string[]> {
    return await this.client.keys('*');
  }

  async getTTL(key: string): Promise<number> {
    return await this.client.ttl(key);
  }
}
