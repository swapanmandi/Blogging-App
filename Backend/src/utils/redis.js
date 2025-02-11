import Redis from "ioredis";

const redis = new Redis({
  password: process.env.REDIS_PASSWORD,
  host: 'redis-17852.c258.us-east-1-4.ec2.redns.redis-cloud.com',
  port: 17852,
  username: "default",
  db: 0,
});

export default redis;