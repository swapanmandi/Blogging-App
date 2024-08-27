import Redis from "ioredis";

const redis = new Redis({
  password: "dwjfI2IpGscrGSTA39H2NGg6J0L0K4MX",
  host: "redis-13020.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 13020,
  username: "default",

  db: 0,
});

export default redis;
