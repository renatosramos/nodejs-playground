# Redis Transactions

Redis use what is called serialized commands, so every command in a transaction is processed sequentially, without any chance to another request be processed in the middle of a Redis transaction. So if we have two transactions to be commit the Reds take care that each transaction should be executed exactly after each other.

A transaction in Redis is performed using the statements *multi*, *exec*, *discard* and *watch*. The multi command is used to start the transaction, while the *exec* command is used to save the information on disk. *Discard* will close the transaction without processing the informations.

If the client loses connection with the server during a transaction or the server crashes, any of the commands in the transaction will be commited.

A good point to know is that if one command in the transaction fails, all the other commands in the queue will be processed. Redis don't stop the execution of the transaction. This is justified by the Redis team, that a command fail only if the developer makes a mistake, so that should be easly detectable. Another argument is that the ability of rollback a transaction would make Redis lose performance.
