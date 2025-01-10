import express from "express";
import redis from "redis";

const redisClient = redis.createClient({
  url: "redis://redis-visitor-count:6379",
  port: 6379,
});

await redisClient.connect();

const visitorCountKey = "visitor-count";

const setVisitorCount = async () => {
  console.log(">>>>>>>inside visitor count")

  const currentVisitorCount = await redisClient.get(visitorCountKey);
  let updatedVisitorCount = 0;

  if (!currentVisitorCount) {
    redisClient.set(visitorCountKey, 0);
  } else {
    updatedVisitorCount = Number(currentVisitorCount) + 1;
    redisClient.set(visitorCountKey, updatedVisitorCount);
    console.log(updatedVisitorCount);
  }

  return updatedVisitorCount;
};

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const visitorCount = await setVisitorCount();
  const logToDisplay = `App running on docker, currentVisitorCount: ${visitorCount}`;
  res.send(logToDisplay);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
