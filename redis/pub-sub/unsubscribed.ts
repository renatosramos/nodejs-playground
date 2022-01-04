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

  await subscriber.subscribe("news:politics", (message) => {
    console.log(`news:politics subscriber:: ${new Date().toUTCString()} :: ${message}`);
  });

  await subscriber.pUnsubscribe("news:*");

  console.log("unsubscribed waiting...");
}

subscribe();