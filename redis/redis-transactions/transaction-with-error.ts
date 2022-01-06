import { createClient } from "redis";

const execTransaction = async (): Promise<void> => {
  const redisClient = createClient({
    url: "redis://localhost:6379"
  });

  redisClient.connect();

  console.log("** Transaction with error **");

  redisClient.del("demo");

  const transaction = await redisClient.multi();

  transaction.set("demo", "foo");
  await transaction.lPop("demo");

  const previousDemo = await redisClient.get("demo");
  console.log(`previousDemo: ${previousDemo}`);

  const [ transactionResult, err ] = await transaction.exec();

  console.log(`transactionResult: ${transactionResult}`);
  console.log(err);

  const committedDemo = await redisClient.get("demo");
  console.log(`committedDemo: ${committedDemo}`);
}

execTransaction();
