# WonderQ - Simple queuing system

A Simple Queue service. WonderQ is a broker that allows producers to write to it, and consumers to read from it. It runs on a single server and has a single message queue. Whenever a producer writes to WonderQ, a message is generated and returned as confirmation. Whenever a consumer polls WonderQ for new messages, it can get those messages. These messages should NOT be available for processing by any other consumer that may be concurrently accessing WonderQ.

## Installation

Developed using node 12

* Clone this repository
* run `npm install`
* start server with `npm run start`

Server starts at `http://localhost:3000`

## Producer API Documentation

**Post a Message to queue**

Adds a message to the queue. The message is now visible to be consumed.

```
POST /messages

- Attributes
-- message: String with a title (Required)

- body example
{
    "message": "Test 1"
}

- response example

{
    "id": "56a85229-ff68-42c4-a6dc-aeb017a4aaac",
    "message": "Test 1",
    "status": "VISIBLE"
}
```

## Consumer API Documentation

**Poll messages in queue**

Return all available messages to be consumed.
These messages will be marked as Processing. Also a visibility timeout will start. If a message is not marked as finished and timeout triggers, that message will be available to be consumed again.

Default timeout: 15000 miliseconds (can be configured using `VISIBILITY_TIMEOUT` env variable eg. `VISIBILITY_TIMEOUT=10000 npm run start`)


```
GET /messages/poll

- response example

[
    {
        "id": "761cf6a6-0003-42c6-9db2-49f3e9a903b1",
        "message": "Test 2",
        "status": "PROCESSING"
    },
    {
        "id": "878a772b-e7c8-43c9-b26b-07026ce197af",
        "message": "Test 2",
        "status": "PROCESSING"
    }
]
```

**Finish message**

Used to mark one message as finished. This message is removed from queue. A messages MUST BE in Processing status to be marked as Finished


```
PUT /messages/:messageId

- Params
-- messageId: Message Id to be finished (Required)

- response example

{
    "sucess": true,
    "message": "Message ID 761cf6a6-0003-42c6-9db2-49f3e9a903b1 finished. Removed from queue"
}
```

## Miscellaneous API Documentation

**Get all messages in queue (debugging)**

Return all messages in the queue. Either in Processing or Visible status. This endpoint is meant to be used for debugging purposes and is not meant to be used for either consumer or producer.


```
GET /messages

- response example

[
    {
        "id": "761cf6a6-0003-42c6-9db2-49f3e9a903b1",
        "message": "Test 2",
        "status": "PROCESSING"
    },
    {
        "id": "878a772b-e7c8-43c9-b26b-07026ce197af",
        "message": "Test 2",
        "status": "VISIBLE"
    }
]
```

## A Simple workflow
 * Producer A creates message Test 1 (POST `/messages`) 
 * Producer B creates message Test 2 (POST `/messages`)
 * Consumer A polls queue and gets two messages ( GET `/messages/poll`)
 * Immediately after Consumer B polls queue and gets zero messages because all messages are in Processing and not visibile anymore( GET `/messages/poll`)
 * Within timeout period, Consumer A marks Test 1 as Finished (PUT `/messages/:messageId`)
 * After timeout period expires, Test 2 is visible again to be consumed, because it was not marked as finished.