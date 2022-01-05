import { createClient } from "redis"

const consumer = async (): Promise<void> => {
  const client = createClient({
    url: "redis://localhost:6379"
  });

  client.connect();

  console.log("waiting some job to do...");

  while (true) {
    const result = await client.BLPOP(["my-queue"], 0);

    console.log("doing job: " + result?.element + ", " + result?.key);
  }
}

consumer();