## **Section 17: Cross-Service Data Replication In Action**

## Table of Contents
- [**Section 17: Cross-Service Data Replication In Action**](#section-17-cross-service-data-replication-in-action)
- [Table of Contents](#table-of-contents)
  - [The Orders Service](#the-orders-service)
  - [Scaffolding the Orders Service](#scaffolding-the-orders-service)
  - [A Touch More Setup](#a-touch-more-setup)
  - [Ingress Routing Rules](#ingress-routing-rules)
  - [Scaffolding a Few Route Handlers](#scaffolding-a-few-route-handlers)
  - [Subtle Service Coupling](#subtle-service-coupling)
  - [Associating Orders and Tickets](#associating-orders-and-tickets)
  - [Order Model Setup](#order-model-setup)
  - [The Need for an Enum](#the-need-for-an-enum)
  - [Creating an Order Status Enum](#creating-an-order-status-enum)
  - [More on Mongoose Refs](#more-on-mongoose-refs)
  - [Defining the Ticket Model](#defining-the-ticket-model)
  - [Order Creation](#order-creation)
  - [Finding Reserved Tickets](#finding-reserved-tickets)
  - [Convenience Document Methods](#convenience-document-methods)
  - [Order Expiration Times](#order-expiration-times)
  - [Test Suite Setup](#test-suite-setup)
  - [Asserting Tickets Exist](#asserting-tickets-exist)
  - [Asserting Reserved Tickets](#asserting-reserved-tickets)
  - [Testing the Success Case](#testing-the-success-case)
  - [Fetching a User's Orders](#fetching-a-users-orders)
  - [A Slightly Complicated Test](#a-slightly-complicated-test)
  - [Fetching Individual Orders](#fetching-individual-orders)
  - [Does Fetching Work?](#does-fetching-work)
  - [Cancelling an Order](#cancelling-an-order)
  - [Can We Cancel?](#can-we-cancel)

### The Orders Service

| Services   | Summary                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------- |
| auth       | Everything related to user signup/signin/signout                                               |
| tickets    | Ticket creation/editing.  Knows whether a ticket can be updated                                |
| orders     | Order creation/editing                                                                         |
| expiration | Watches for orders to be created, cancels them after 15 minutes                                |
| payments   | Handles credit card payments.  Cancels orders if payments fails, completes if payment succeeds |

![](section-17/app-2.jpg)
![](section-17/order-service-1.jpg)
![](section-17/order-service-2.jpg)

**[⬆ back to top](#table-of-contents)**

### Scaffolding the Orders Service

Orders Service Setup

- Duplicate the 'tickets' service
- Install dependencies
- Build an image out of the orders service
- Create a Kubernetes deployment file
- Set up file sync options in the skaffold.yaml file
- Set up routing rules in the ingress service

**[⬆ back to top](#table-of-contents)**

### A Touch More Setup

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: orders
  template:
    metadata:
      labels:
        app: orders
    spec:
      containers:
        - name: orders
          image: chesterheng/orders
          env:
            - name: NATS_CLUSTER_ID
              value: 'ticketing'
            - name: NATS_CLIENT_ID
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: NATS_URL
              value: 'http://nats-srv:4222'
            - name: MONGO_URI
              value: 'mongodb://orders-mongo-srv:27017/orders'
            - name: JWT_KEY
              valueFrom:
                secretKeyRef:
                  name: jwt-secret
                  key: JWT_KEY
---
apiVersion: v1
kind: Service
metadata:
  name: orders-srv
spec:
  selector:
    app: orders
  ports:
    - name: orders
      protocol: TCP
      port: 3000
      targetPort: 3000
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-mongo-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: orders-mongo
  template:
    metadata:
      labels:
        app: orders-mongo
    spec:
      containers:
        - name: orders-mongo
          image: mongo
---
apiVersion: v1
kind: Service
metadata:
  name: orders-mongo-srv
spec:
  selector:
    app: orders-mongo
  ports:
    - name: db
      protocol: TCP
      port: 27017
      targetPort: 27017
```

```yaml
  - image: chesterheng/orders
    context: orders
    docker:
      dockerfile: Dockerfile
    sync:
      manual:
        - src: 'src/**/*.ts'
          dest: .
```

**[⬆ back to top](#table-of-contents)**

### Ingress Routing Rules

```yaml
  - path: /api/orders/?(.*)
    backend:
      serviceName: orders-srv
      servicePort: 3000
```

**[⬆ back to top](#table-of-contents)**

### Scaffolding a Few Route Handlers

![](section-17/order-service-3.jpg)

```typescript
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/orders', async (req: Request, res: Response) => {
  res.send({});
});

export { router as indexOrderRouter };
```

**[⬆ back to top](#table-of-contents)**

### Subtle Service Coupling

```typescript
router.post(
  '/api/orders', 
  requireAuth, 
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided')
  ], 
  validateRequest, 
  async (req: Request, res: Response) => {
    res.send({});
  }
);
```

**[⬆ back to top](#table-of-contents)**

### Associating Orders and Tickets

![](section-17/ticket-order.jpg)
![](section-17/option-1.jpg)
![](section-17/option-1-1.jpg)
![](section-17/option-1-2.jpg)
![](section-17/option-2.jpg)

Option #2 is selected

**[⬆ back to top](#table-of-contents)**

### Order Model Setup

```typescript
import mongoose from 'mongoose';

interface OrderAttrs {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
```

**[⬆ back to top](#table-of-contents)**

### The Need for an Enum

![](section-17/enum-1.jpg)
![](section-17/enum-2.jpg)
![](section-17/enum-3.jpg)
![](section-17/enum-4.jpg)
![](section-17/enum-5.jpg)

**[⬆ back to top](#table-of-contents)**

### Creating an Order Status Enum

```typescript
export enum OrderStatus {
  // When the order has been created, but the
  // ticket it is trying to order has not been reserved
  Created = 'created',

  // The ticket the order is trying to reserve has already
  // been reserved, or when the user has cancelled the order.
  // The order expires before payment
  Cancelled = 'cancelled',

  // The order has successfully reserved the ticket
  AwaitingPayment = 'awaiting:payment',

  // The order has reserved the ticket and the user has
  // provided payment successfully
  Complete = 'complete',
}
```

**[⬆ back to top](#table-of-contents)**

### More on Mongoose Refs

```typescript
// To associate an existing Order and Ticket together
const ticket = await Ticket.findOne({});
const order = await Order.findOne({});

order.ticket = ticket;
await order.save();
```

```typescript
// To associate an existing Ticket with a *new* Order
const ticket = await Ticket.findOne({});
const order = Order.build({
  ticket: ticket,
  userId: '...',
  status: OrderStatus.Created,
  expiresAt: tomorrow
})
```

```typescript
// To fetch an existing Order from the database
// with its associated Ticket
const order = await Order.findbyId('...').populate('ticket');
order.ticket.title
order.ticket.price
```

**[⬆ back to top](#table-of-contents)**

### Defining the Ticket Model

```typescript
import mongoose from 'mongoose';

interface TicketAttrs {
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
```

**[⬆ back to top](#table-of-contents)**

### Order Creation 

```typescript
async (req: Request, res: Response) => {
  const { ticketId } = req.body;

  // Find the ticket the user is trying to order in the database
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new NotFoundError();
  }

  // Make sure that this ticket is not already reserved

  // Calculate an expiration date for this order

  // Build the order and save it to the database

  // Publish an event saying that an order was created

  res.send({});
}
```

**[⬆ back to top](#table-of-contents)**

### Finding Reserved Tickets

```typescript
  // Make sure that this ticket is not already reserved
  // Run query to look at all orders.  Find an order where the ticket
  // is the ticket we just found *and* the orders status is *not* cancelled.
  // If we find an order from that means the ticket *is* reserved
  const existingOrder = await Order.findOne({
    ticket: ticket,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  if (existingOrder) {
    throw new BadRequestError('Ticket is already reserved');
  }
```

**[⬆ back to top](#table-of-contents)**

### Convenience Document Methods

```typescript
ticketSchema.methods.isReserved = async function() {
  // Run query to look at all orders.  Find an order where the ticket
  // is the ticket we just found *and* the orders status is *not* cancelled.
  // If we find an order from that means the ticket *is* reserved
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
}
```

**[⬆ back to top](#table-of-contents)**

### Order Expiration Times

```typescript
// Find the ticket the user is trying to order in the database
const ticket = await Ticket.findById(ticketId);
if (!ticket) {
  throw new NotFoundError();
}

// Make sure that this ticket is not already reserved
const isReserved = await ticket.isReserved();
if (isReserved) {
  throw new BadRequestError('Ticket is already reserved');
}

// Calculate an expiration date for this order
const expiration = new Date();
expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

// Build the order and save it to the database
const order = Order.build({
  userId: req.currentUser!.id,
  status: OrderStatus.Created,
  expiresAt: expiration,
  ticket
});
await order.save()

// Publish an event saying that an order was created
```

**[⬆ back to top](#table-of-contents)**

### Test Suite Setup
**[⬆ back to top](#table-of-contents)**

### Asserting Tickets Exist
**[⬆ back to top](#table-of-contents)**

### Asserting Reserved Tickets
**[⬆ back to top](#table-of-contents)**

### Testing the Success Case
**[⬆ back to top](#table-of-contents)**

### Fetching a User's Orders
**[⬆ back to top](#table-of-contents)**

### A Slightly Complicated Test
**[⬆ back to top](#table-of-contents)**

### Fetching Individual Orders
**[⬆ back to top](#table-of-contents)**

### Does Fetching Work?
**[⬆ back to top](#table-of-contents)**

### Cancelling an Order
**[⬆ back to top](#table-of-contents)**

### Can We Cancel?
**[⬆ back to top](#table-of-contents)**
