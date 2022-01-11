import faker from "faker";
import { createClient } from "redis";

const streams = async (): Promise<void> => {
  const redisClient = createClient({
    url: "redis://localhost:6379"
  });

  redisClient.connect();

  const streamKey = "fake-stream";

  for (let index = 0; index < 1000; index++) {
    const result = await redisClient.xAdd(streamKey, "*", { "message": faker.random.word()});
    console.log(result);
  }

  await redisClient.quit();
}

streams();