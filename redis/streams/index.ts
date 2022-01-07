import { createClient } from "redis";

const streams = async (): Promise<void> => {
  const redisClient = createClient({
    url: "redis://localhost:6379"
  });

  redisClient.connect();

  const streamKey = "weather";

  let firstMessage = await redisClient.xAdd(streamKey, "*", { "day": "monday", "status": "light rain" });
  let secondMessage = await redisClient.xAdd(streamKey, "*", { "day": "tuesday", "status": "thunderstorm" });
  let thirdMessage = await redisClient.xAdd(streamKey, "*", { "day": "wednesday", "status": "sunny" });

  firstMessage = getMillisecondsTimeOfId(firstMessage);
  secondMessage = getMillisecondsTimeOfId(secondMessage);
  thirdMessage = getMillisecondsTimeOfId(thirdMessage);

  await showAllStreamMessages();
  await showStreamMessagesFiltered();
  await showOnlyTwoMessagesOfTheStream();

  await showAllMessagesRevert();
  await showStreamMessagesFilteredRevert();
  await showOnlyTwoMessagesOfTheStreamRevert();

  async function showAllStreamMessages() {
    const allStreamMessages = await redisClient.xRange(streamKey, "-", "+");
    console.log(`\n\n*** all messages on stream ***\n`);
    console.log(allStreamMessages);
  }

  async function showStreamMessagesFiltered() {
    const filteredMessages = await redisClient.xRange(streamKey, firstMessage, secondMessage);
    console.log(`\n\n*** filtering messages on stream ***\n`);
    console.log(filteredMessages);
  }

  async function showOnlyTwoMessagesOfTheStream() {
    const firstMessages = await redisClient.xRange(streamKey, firstMessage, "+", {
      COUNT: 2
    });
    console.log(`\n\n*** first two messages on stream ***\n`);
    console.log(firstMessages);
  }

  async function showAllMessagesRevert() {
    const allStreamMessagesRevert = await redisClient.xRevRange(streamKey, "+", "-");
    console.log(`\n\n*** all messages on stream revert ***\n`);
    console.log(allStreamMessagesRevert);
  }

  async function showStreamMessagesFilteredRevert() {
    const filteredMessagesRevert = await redisClient.xRevRange(streamKey, thirdMessage, secondMessage);
    console.log(`\n\n*** filtering messages on stream ***\n`);
    console.log(filteredMessagesRevert);
  }

  async function showOnlyTwoMessagesOfTheStreamRevert() {
    const lastMessages = await redisClient.xRevRange(streamKey, thirdMessage, "-", {
      COUNT: 1
    });
    console.log(`\n\n*** last two messages on stream ***\n`);
    console.log(lastMessages);
  }
}

const getMillisecondsTimeOfId = (id: string): string => {
  const splitedId = id.split("-");

  return (splitedId.length > 0)
  ? splitedId[0]
  : "";
}

streams();