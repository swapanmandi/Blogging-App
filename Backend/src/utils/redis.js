import Redis from "ioredis";

const redis = new Redis({
  password: 'Xg6lhNqqdCGL0OnsEIY1S9TqZraRLAFV',
  host: 'redis-12308.c326.us-east-1-3.ec2.redns.redis-cloud.com',
  port: 12308,
  username: "default",
  db: 0,
});

export default redis;