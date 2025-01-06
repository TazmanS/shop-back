import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: 'localhost',
      port: 6379,
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
