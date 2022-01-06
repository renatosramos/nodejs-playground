import { createClient } from "redis";

const execTransaction = async (): Promise<void> => {
  const redisClient = createClient({
    url: "redis://localhost:6379"
  });

  redisClient.connect();

  console.log("** Committed transaction **");
  const transaction = await redisClient.multi();

  transaction.incr("foo");
  transaction.incr("bar");

  const previousFoo = await redisClient.get("foo");
  const previousBar = await redisClient.get("bar");
  console.log(`previousFoo: ${previousFoo}, previousBar: ${previousBar}`);

  const [ committedFoo, committedBar ] = await transaction.exec();

  console.log(`committedFoo: ${committedFoo}, commitedBar: ${committedBar}`);
}

const discardTransaction = async (): Promise<void> => {
  const redisClient = createClient({
    url: "redis://localhost:6379"
  });

  redisClient.connect();

  console.log("** Discarded transaction **");

  const transaction = await redisClient.multi();

  const previousFoo = await redisClient.get("foo");
  const previousBar = await redisClient.get("bar");
  console.log(`previousFoo: ${previousFoo}, previousBar: ${previousBar}`)

  await transaction.discard();

  const discardedFoo = await redisClient.get("foo");
  const discardedBar = await redisClient.get("bar");
  console.log(`discardedFoo: ${discardedFoo}, discardedBar: ${discardedBar}`)
}

execTransaction().then(() => {
  discardTransaction();
});
