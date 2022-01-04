import { createClient } from "redis";

const subscribe = async (): Promise<void> => {
  const client = createClient({
    url: "redis://localhost:6379"
  });

  const subscriber = client.duplicate();

  await subscriber.connect();

  await subscriber.subscribe("news:sports", (message) => {
    console.log(`news:sports subscriber:: ${new Date().toUTCString()} :: ${message}`);
  });
  await subscriber.subscribe("news:weather", (message) => {
    console.log(`news:weather subscriber:: ${(new Date()).toUTCString()} :: ${message}`);
  });

  console.log("subscriber waiting...");
}

subscribe();