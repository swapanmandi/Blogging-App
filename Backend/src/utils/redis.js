import Redis from "ioredis";

const redis = new Redis({
  password: "nNfmacQ5KXHGSjsepfxPUto4gcu3QpeT",
  host: "redis-11190.c278.us-east-1-4.ec2.redns.redis-cloud.com",
  port: 11190,
  username: "default",
  db: 0,
});

export default redis;

// import { createClient } from 'redis';

// const client = createClient({
//     password: 'nNfmacQ5KXHGSjsepfxPUto4gcu3QpeT',
//     socket: {
//         host: 'redis-11190.c278.us-east-1-4.ec2.redns.redis-cloud.com',
//         port: 11190
//     }
// });
