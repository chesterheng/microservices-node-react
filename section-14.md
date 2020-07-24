## **Section 14: NATS Streaming Server - An Event Bus Implementation**

## Table of Contents
- [**Section 14: NATS Streaming Server - An Event Bus Implementation**](#section-14-nats-streaming-server---an-event-bus-implementation)
- [Table of Contents](#table-of-contents)
  - [What Now?](#what-now)
  - [Three Important Items](#three-important-items)
  - [Creating a NATS Streaming Deployment](#creating-a-nats-streaming-deployment)
  - [Big Notes on NATS Streaming](#big-notes-on-nats-streaming)
  - [Building a NATS Test Project](#building-a-nats-test-project)
  - [Port-Forwarding with Kubectl](#port-forwarding-with-kubectl)
  - [Publishing Events](#publishing-events)
  - [Listening For Data](#listening-for-data)
  - [Accessing Event Data](#accessing-event-data)
  - [Client ID Generation](#client-id-generation)
  - [Queue Groups](#queue-groups)
  - [Manual Ack Mode](#manual-ack-mode)
  - [Client Health Checks](#client-health-checks)
  - [Graceful Client Shutdown](#graceful-client-shutdown)
  - [Core Concurrency Issues](#core-concurrency-issues)
  - [Common Questions](#common-questions)
  - [[Optional] More Possible Concurrency Solutions](#optional-more-possible-concurrency-solutions)
  - [Solving Concurrency Issues](#solving-concurrency-issues)
  - [Concurrency Control with the Tickets App](#concurrency-control-with-the-tickets-app)
  - [Event Redelivery](#event-redelivery)
  - [Durable Subscriptions](#durable-subscriptions)

### What Now?

![](section-14/options.jpg)
![](section-14/option-3.jpg)
![](section-14/event-bus.jpg)

**[⬆ back to top](#table-of-contents)**

### Three Important Items

NATS Streaming Server

- Docs at: docs.nats.io
- NATS and NATS Streaming Server are two different things
  - [NATS Streaming Concepts](https://docs.nats.io/nats-streaming-concepts/intro)
- NATS Streaming implements some extraordinarily important design decisions that will affect our app
- We are going to run the official '[nats-streaming](https://hub.docker.com/_/nats-streaming)' docker image in kubernetes.  
  - Need to read the image's docs: Commandline Options
- [Event-Driven Microservices With NATS Streaming](https://www.slideshare.net/shijucv/eventdriven-microservices-with-nats-streaming-95207688)

**[⬆ back to top](#table-of-contents)**

### Creating a NATS Streaming Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nats-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nats
  template:
    metadata:
      labels:
        app: nats
    spec:
      containers:
        - name: nats
          image: nats-streaming:0.17.0
          args:
            [
              '-p',
              '4222',
              '-m',
              '8222',
              '-hbi',
              '5s',
              '-hbt',
              '5s',
              '-hbf',
              '2',
              '-SD',
              '-cid',
              'ticketing',
            ]
---
apiVersion: v1
kind: Service
metadata:
  name: nats-srv
spec:
  selector:
    app: nats
  ports:
    - name: client
      protocol: TCP
      port: 4222
      targetPort: 4222
    - name: monitoring
      protocol: TCP
      port: 8222
      targetPort: 8222
```

```console
cd section-14/ticketing
skaffold dev
kubectl get pods
```

**[⬆ back to top](#table-of-contents)**

### Big Notes on NATS Streaming

[Stan.js - Node.js client for NATS Streaming](https://github.com/nats-io/stan.js)

![](section-14/custom-1.jpg)
![](section-14/nats-1.jpg)

![](section-14/custom-2.jpg)
![](section-14/nats-2.jpg)

![](section-14/custom-3.jpg)
![](section-14/nats-3.jpg)
![](section-14/nats-3-1.jpg)

**[⬆ back to top](#table-of-contents)**

### Building a NATS Test Project

Short Term Goal

- Create a new sub-project with typescript support
- Install node-nats-streaming library and connect to nats streaming server
- We should have two npm scripts, one to run code to emit events, and one to run code to listen for events
- This program will be ran outside of kubernetes!

```typescript
// publisher.ts
import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');
});
```

**[⬆ back to top](#table-of-contents)**

### Port-Forwarding with Kubectl

![](section-14/connect-1.jpg)
![](section-14/connect-2.jpg)
![](section-14/connect-3.jpg)

- Option #3 is selected for small test program

```console
kubectl get pods
kubectl port-forward nats-depl-7cf98f65b8-p8nk6 4222:4222
cd section-14/ticketing/nats-test
npm run publish
```

**[⬆ back to top](#table-of-contents)**

### Publishing Events

![](section-14/publisher.jpg)

```typescript
// publisher.ts
import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  })
});
```

**[⬆ back to top](#table-of-contents)**

### Listening For Data

```typescript
// listener.ts
import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', '123', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const subscription = stan.subscribe('ticket:created');

  subscription.on('message', (msg) => {
    console.log('Message recieved');
  });
});
```

- split screen to watch both publisher and listener
![](section-14/split-screen.jpg)
- type rs and enter to re-start publisher
![](section-14/split-screen-rs.jps)

**[⬆ back to top](#table-of-contents)**

### Accessing Event Data

```typescript
import nats, { Message } from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', '123', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const subscription = stan.subscribe('ticket:created');

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }
  });
});
```

**[⬆ back to top](#table-of-contents)**

### Client ID Generation

![](section-14/client-id.jpg)

```typescript
import { randomBytes } from 'crypto';

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});
```

**[⬆ back to top](#table-of-contents)**

### Queue Groups

![](section-14/queue-groups-1.jpg)
![](section-14/queue-groups-2.jpg)

```typescript
  const subscription = stan.subscribe(
    'ticket:created', 
    'orders-service-queue-group'
  );
```
- listener join 'orders-service-queue-group'
- publisher send a event
- only one listener in 'orders-service-queue-group' receive the event at a time

![](section-14/split-screen-3.jpg)

**[⬆ back to top](#table-of-contents)**

### Manual Ack Mode

- event can be lost for auto acknowledgement when error occurs

![](section-14/manual-ack.jpg)

- listener manually acknowledge once it process the message successfully

```typescript
stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true);
  const subscription = stan.subscribe(
    'ticket:created', 
    'orders-service-queue-group',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});
```

**[⬆ back to top](#table-of-contents)**

### Client Health Checks

- monitoring port 8222 for debugging

```console
kubectl get pods
kubectl port-forward nats-depl-7cf98f65b8-p8nk6 8222:8222
```

- open chrome
- goto localhost:8222/streaming

goto http://localhost:8222/streaming/channelsz?subs=1

- 2 listeners are available
- if re-start one listener, within 30s there are 3 listeners
- after 30s, drops back to 2 listeners

**[⬆ back to top](#table-of-contents)**

### Graceful Client Shutdown

```typescript
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });
  
  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true);
  const subscription = stan.subscribe(
    'ticket:created', 
    'orders-service-queue-group',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
```

**[⬆ back to top](#table-of-contents)**

### Core Concurrency Issues

- Success

![](section-14/account-1.jpg)
![](section-14/account-2.jpg)
![](section-14/account-3.jpg)
![](section-14/account-4.jpg)

- Fail to update +$70 at file storage

![](section-14/fail-1.jpg)
![](section-14/fail-2.jpg)
![](section-14/fail-3.jpg)


- One listener might run more quicker than another
- -$100 is done faster than +$70 and +$40

![](section-14/fail-4.jpg)

- NATS might think a client is still alive when it is dead

![](section-14/fail-5.jpg)

- We might receive the same event twice

![](section-14/fail-6.jpg)

**[⬆ back to top](#table-of-contents)**

### Common Questions

- Async (event-based) communication sounds terrible, right?!?!
- Oh, turns out this happens with sync communications
- Oh, and it happens with classic monolith style apps too.

![](section-14/monolith.jpg)

- Instance A and B are busy
- Instance C do -$100 before +$70 and +$40 complete

![](section-14/solution-1)

- receive +$70, +$40 and -$100 events, any event can fail too
- bottleneck for listener
- hard to scale
  - vertically: increase specification per service
  - horizontally: add more instance of the service

Solution that won't work #2 - Figure out every possible error case and write code to handle it

- An infinite number of things can fail
- Engineering time = $$$$$
- Does it matter if two tweets are out of order?

**[⬆ back to top](#table-of-contents)**

### [Optional] More Possible Concurrency Solutions

- Share state between services of last event processed

![](section-14/share-1.jpg)
![](section-14/share-2.jpg)
![](section-14/share-3.jpg)
![](section-14/share-4.jpg)

- Event #1 fail. Cannot +$70 to User A account
- Event #2: +$40 to User B account will be delay

![](section-14/share-5.jpg)

- Last event processed tracked by resource ID

![](section-14/resource-id-1.jpg)
![](section-14/resource-id-2.jpg)

- Last Sequence ID

![](section-14/last-seq-1.jpg)
![](section-14/last-seq-2.jpg)
![](section-14/last-seq-3.jpg)
![](section-14/last-seq-4.jpg)
![](section-14/last-seq-5.jpg)
![](section-14/last-seq-6.jpg)
![](section-14/last-seq-7.jpg)

**[⬆ back to top](#table-of-contents)**

### Solving Concurrency Issues

- We are working with a poorly designed system and relying on NATS to somehow save us
- We should revisit the service design.
- If we redesign the system, a better solution to this concurrency stuff will present itself

![](section-14/concurrency-1.jpg)
![](section-14/concurrency-2.jpg)
![](section-14/concurrency-3.jpg)
![](section-14/concurrency-4.jpg)
![](section-14/concurrency-5.jpg)
![](section-14/concurrency-6.jpg)
![](section-14/concurrency-7.jpg)
![](section-14/concurrency-8.jpg)

**[⬆ back to top](#table-of-contents)**

### Concurrency Control with the Tickets App

![](section-14/concurrency-9.jpg)

**[⬆ back to top](#table-of-contents)**

### Event Redelivery

![](section-14/event-redelivery.jpg)

```typescript
const options = stan
  .subscriptionOptions()
  .setManualAckMode(true)
  .setDeliverAllAvailable();
```

**[⬆ back to top](#table-of-contents)**

### Durable Subscriptions

![](section-14/durable-subscription.jpg)

```typescript
const options = stan
  .subscriptionOptions()
  .setManualAckMode(true)
  .setDeliverAllAvailable()
  .setDurableName('accounting-service');

const subscription = stan.subscribe(
  'ticket:created',
  'queue-group-name',
  options
);
```

**[⬆ back to top](#table-of-contents)**