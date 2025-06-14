// @ts-ignore
import Redis from "ioredis";

export class CacheServiceSingleton {
  private static instance: CacheServiceSingleton;
  private redis: Redis;

  private constructor() {
    this.redis = new Redis("redis://username:authpassword@127.0.0.1:6380/4");

    console.log("🔌 Redis connection created");
  }

  public static getInstance(): CacheServiceSingleton {
    if (!CacheServiceSingleton.instance) {
      CacheServiceSingleton.instance = new CacheServiceSingleton();
    }
    return CacheServiceSingleton.instance;
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async set(key: string, value: string, ttl: number = 3600): Promise<void> {
    await this.redis.setex(key, ttl, value);
  }
}
