# Pub/Sub

One of the features provided by Redis is the Publish/Subscribe messaging paradigm where subscribers can receive a message from none or multiple channels, without knowledge of who is sending the messages. While publishers will send messages to one or multiple channels and not for a receiver.


# Demo

1. Install the dependecies

```
npm install
```

2. Run redis on a Docker container

```
docker-compose up -d
```

3. Build the solution

```
npm run build
```

4. Start one or more subscribers

    * See the commands on package.json

    * In order to see the correct results is important run each subscriber on an independet terminal

```
Ex.: npm run run:subscriber
```

5. Start the publisher

```
npm start
```

You can see more information [here](https://redis.io/topics/pubsub)