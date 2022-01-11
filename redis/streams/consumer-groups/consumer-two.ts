import { createClient } from "redis";

const consumerGroups = async (): Promise<void> => {
  const redisClient = createClient({
    url: "redis://localhost:6379"
  });

  redisClient.connect();

  const streamKey = "fake-stream";

  const group = `${streamKey}-group1`;

  // await redisClient.xGroupCreate(streamKey, group, "$");

  while (true) {
    const result = await redisClient.xReadGroup(group, "second-consumer", { key: streamKey, id: ">" }, {
      COUNT: 1,
      BLOCK: 5
    });

    console.log(JSON.stringify(result));
  }

  await redisClient.quit();
}

consumerGroups();