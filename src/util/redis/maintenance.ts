const Redis = require('ioredis');

const redisSessionInfo = {
  host: process.env.NEXT_PUBLIC_REDIS_MAINTENANCE_HOST,
  port: process.env.NEXT_PUBLIC_REDIS_MAINTENANCE_PORT
};

const redis = new Redis(redisSessionInfo);

const REDIS_MAINTENANCE = {
  set: (key: string, value: any) => redis.set(key, value, 'EX', 60 * 30),
  get: (key: string) => redis.get(key),
  mget: (key: string | Array<string>) =>
    redis.mget(key, (err: any, result: any) => console.log(result)),
  hmset: (key: string, value: any) => redis.hmset(key, value),
  hmget: (key: string) =>
    redis.hmget(key, (err: any, result: any) => console.log(result)),
  hmdel: (key: string) =>
    redis.hmdel(key, (err: any, result: any) => console.log(result)),
  keys: (key: string) =>
    redis.keys(key, (err: any, result: any) => console.log(result)),
  del: (key: string) =>
    redis.del(key, (err: any, result: any) => console.log(result)),
  expire: (key: string, time: number) => redis.expire(key, time),
  ttl: (key: string) =>
    redis.ttl(key, (err: any, result: any) => console.log(result))
};

export default REDIS_MAINTENANCE;
