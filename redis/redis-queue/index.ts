import { createClient } from "redis"

const demo = async () => {
  const client = createClient({
    url: "redis://localhost:6379"
  });

  client.connect();

  for (let i = 0; i < 10001; i++) {
    await client.rPush("my-queue", i + "");
  }

  client.quit();
}

demo();