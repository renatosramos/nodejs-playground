# Redis Streams

Redis Streams models a *log data structure* but with some additional resources, like blocking operations, consumer groups, which allows group of consumers to consume different parts of a same message.

Blocking operations on Redis Streams, despite to be similar to Redis Pub/Sub or blocking lists, have some differences for these two. The main difference is that stream messages are appended to the stream indefinitely, so even after a message be processed by a consumer, its still exists in the stream, except you delete them.

This behavior is achieved because the consumer maintain the ID of the last message received from the stream.
