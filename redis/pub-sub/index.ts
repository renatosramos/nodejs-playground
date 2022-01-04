import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6379"
});


const run = async (): Promise<void> => {
  await client.connect();

  await publishNewsSports();
  await publishNewsWeather();
  await publishNewsPolitics();
  await publishNewsEconomy();

  await showActiveChanells();

  console.log("message puslished...");
}

run();

const publishNewsPolitics = async () => {
  await client.publish("news:politics", "new message for channel news:politics");
}

const publishNewsWeather = async () => {
  await client.publish("news:weather", "new message for channel news:weather");
}

const publishNewsSports = async () => {
  await client.publish("news:sports", "new message for channel news:sports");
}

const publishNewsEconomy = async () => {
  await client.publish("news:economy", "new message for channel news:economy");
}

const showActiveChanells = async () => {
  /* An active channel is a channel with one or more subscribers,
     excluding clients subscribed to patterns
  */
  const activeChannels = await client.pubSubChannels();
  activeChannels.forEach(channel => {
    console.log(channel);
  });
}
