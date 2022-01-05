# Redis Queue

A Message Queue model allows two or more processes interact with each other in a asynchronous pattern, where a producer sends messages to the queue and consumers processes the messages in the queue.

This concept is similar to the publisher/subscriber pattern, but in the pub/sub when a message is published to a channel, all the subscribers will receive the message at the same time. Meanwhile in the message queue model two different consumers cannot process the same message.

# Demo

In this example was created a consumer, that will wait indefinitely for jobs to be included in the queue, while the producer will insert multiples jobs sequentially in the queue.

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

4. Start one or more consumer

    * In order to see a better result run multiples consumers in independent terminals

```
Ex.: npm run start:consumer
```

5. Start the publisher

```
npm start
```

Source:

[See "Blocking operations on lists"](https://redis.io/topics/data-types-intro)
[Queuing Tasks with Redis](https://www.rapid7.com/blog/post/2016/05/04/queuing-tasks-with-redis/)