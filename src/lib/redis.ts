import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST as string,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: 1,
  showFriendlyErrorStack: true,
});

redis.on("error", (error) => {
  console.error(error, JSON.stringify({ loggedFrom: "ioredis error event" }));
});

export default redis;
