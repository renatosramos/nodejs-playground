import { createClient } from "redis";

const blockingOperations = async (): Promise<void> => {
  const redisClient = createClient({
    url: "redis://localhost:6379"
  });

  redisClient.connect();

  const streamKey = "weather";

  while (true) {
    const newMessages = await redisClient.xRead([{key: streamKey, id: "$"}], {
      BLOCK: 0, // timeout to read new messages, 0 means no timeout
    });

    console.log(JSON.stringify(newMessages));
  }
}

blockingOperations();