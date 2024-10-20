import Redis, { ClusterNode, ClusterOptions, RedisOptions } from 'ioredis';
import { flightSlackMessage } from '../flightSlackMessage';
const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

const redisOptions: RedisOptions = {
  host: process.env.NEXT_PUBLIC_REDIS_SESSION_HOST,
  port: Number(process.env.NEXT_PUBLIC_REDIS_SESSION_PORT),

  db: Number(process.env.NEXT_PUBLIC_REDIS_SESSION_DB),
  password: process.env.NEXT_PUBLIC_REDIS_SESSION_PASSWORD
};

// cluster setting
const startupNode: ClusterNode[] = [
  {
    port: Number(process.env.NEXT_PUBLIC_REDIS_SESSION_PORT),
    host: process.env.NEXT_PUBLIC_REDIS_SESSION_HOST
  }
];

const clusterOptions: ClusterOptions = {
  // scaleReads: 'all',
  // enableOfflineQueue: false, // 오프라인 큐 사용 설정
  // enableAutoPipelining: true,
  slotsRefreshTimeout: 10000
  // dnsLookup: (address: any, callback: any) => callback(null, address),
  // redisOptions: {
  //   tls: {}
  // password: process.env.NEXT_PUBLIC_REDIS_SESSION_PASSWORD
  // }
};

const redis =
  env === 'local'
    ? new Redis(redisOptions)
    : new Redis.Cluster(startupNode, clusterOptions);
// new Cluster(startupNode, clusterOptions);

redis.on('connect', () => {
  flightSlackMessage(`connected to redis server`);
});

redis.on('close', () => {
  flightSlackMessage(`redis connection closed attempting reconnect x`);
  // redis.connect();
});

redis.on('error', (error) => {
  flightSlackMessage(`redis connection error ${error}`);
});

const REDIS_CUSTOM = {
  set: (key: string, value: any) => redis.set(key, value, 'EX', 60 * 30),
  get: (key: string) => redis.get(key),
  // mget: (key: string | Array<string>) =>
  //   redis.mget(key, (err: any, result: any) => console.log(result)),
  hmset: (key: string, value: any) => redis.hmset(key, value),
  hmget: (key: string) =>
    redis.hmget(key, (err: any, result: any) => console.log(result)),
  // hmdel: (key: string) =>
  //   redis.hmdel(key, (err: any, result: any) => console.log(result)),
  keys: (key: string) =>
    redis.keys(key, (err: any, result: any) => console.log(result)),
  del: (key: string) =>
    redis.del(key, (err: any, result: any) => console.log(result)),
  expire: (key: string, time: number) => redis.expire(key, time),
  ttl: (key: string) =>
    redis.ttl(key, (err: any, result: any) => console.log(result))
};

export default REDIS_CUSTOM;
