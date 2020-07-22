## **Section 16: Managing a NATS Client**

## Table of Contents
- [**Section 16: Managing a NATS Client**](#section-16-managing-a-nats-client)
- [Table of Contents](#table-of-contents)
  - [Publishing Ticket Creation](#publishing-ticket-creation)
  - [More on Publishing](#more-on-publishing)
  - [NATS Client Singleton](#nats-client-singleton)
  - [Remember Mongoose?](#remember-mongoose)
  - [Singleton Implementation](#singleton-implementation)
  - [Accessing the NATS Client](#accessing-the-nats-client)
  - [Graceful Shutdown](#graceful-shutdown)
  - [Successful Listen!](#successful-listen)
  - [Ticket Update Publishing](#ticket-update-publishing)
  - [Failed Event Publishing](#failed-event-publishing)
  - [Handling Publish Failures](#handling-publish-failures)
  - [Fixing a Few Tests](#fixing-a-few-tests)
  - [Redirecting Imports](#redirecting-imports)
  - [Providing a Mock Implementation](#providing-a-mock-implementation)
  - [Test-Suite Wide Mocks](#test-suite-wide-mocks)
  - [Ensuring Mock Invocations](#ensuring-mock-invocations)
  - [NATS Env Variables](#nats-env-variables)

### Publishing Ticket Creation

```typescript
// ticket-created-publisher.ts
import { Publisher, Subjects, TicketCreatedEvent } from '@chticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
```

**[⬆ back to top](#table-of-contents)**

### More on Publishing

```typescript
// new.ts
await new TicketCreatedPublisher(client).publish({
  id: ticket.id,
  title: ticket.title,
  price: ticket.price,
  userId: ticket.userId,
});
```
**[⬆ back to top](#table-of-contents)**

### NATS Client Singleton
**[⬆ back to top](#table-of-contents)**

### Remember Mongoose?
**[⬆ back to top](#table-of-contents)**

### Singleton Implementation
**[⬆ back to top](#table-of-contents)**

### Accessing the NATS Client
**[⬆ back to top](#table-of-contents)**

### Graceful Shutdown
**[⬆ back to top](#table-of-contents)**

### Successful Listen!
**[⬆ back to top](#table-of-contents)**

### Ticket Update Publishing
**[⬆ back to top](#table-of-contents)**

### Failed Event Publishing
**[⬆ back to top](#table-of-contents)**

### Handling Publish Failures
**[⬆ back to top](#table-of-contents)**

### Fixing a Few Tests
**[⬆ back to top](#table-of-contents)**

### Redirecting Imports
**[⬆ back to top](#table-of-contents)**

### Providing a Mock Implementation
**[⬆ back to top](#table-of-contents)**

### Test-Suite Wide Mocks
**[⬆ back to top](#table-of-contents)**

### Ensuring Mock Invocations
**[⬆ back to top](#table-of-contents)**

### NATS Env Variables
**[⬆ back to top](#table-of-contents)**
