import { createClient } from "redis";

const subscribe = async (): Promise<void> => {
  const client = createClient({
    url: "redis://localhost:6379"
  });

  const subscriber = client.duplicate();

  await subscriber.connect();

  await subscriber.pSubscribe("news:*", (message) => {
    console.log(`news:* subscriber:: ${new Date().toUTCString()} :: ${message}`);
  });

  console.log("pattern subscriber waiting...");
}

subscribe();