import Redis from "ioredis";

const redis = new Redis({
  password: process.env.REDIS_PASSWORD,
  host: 'redis-15973.c273.us-east-1-2.ec2.redns.redis-cloud.com',
  port: 15973,
  username: "default",
  db: 0,
});

export default redis;