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
  - [Order Creation Logic](#order-creation-logic)
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
![](section-17/order-service.jpg)

**[⬆ back to top](#table-of-contents)**

### Scaffolding the Orders Service
**[⬆ back to top](#table-of-contents)**

### A Touch More Setup
**[⬆ back to top](#table-of-contents)**

### Ingress Routing Rules
**[⬆ back to top](#table-of-contents)**

### Scaffolding a Few Route Handlers
**[⬆ back to top](#table-of-contents)**

### Subtle Service Coupling
**[⬆ back to top](#table-of-contents)**

### Associating Orders and Tickets
**[⬆ back to top](#table-of-contents)**

### Order Model Setup
**[⬆ back to top](#table-of-contents)**

### The Need for an Enum
**[⬆ back to top](#table-of-contents)**

### Creating an Order Status Enum
**[⬆ back to top](#table-of-contents)**

### More on Mongoose Refs
**[⬆ back to top](#table-of-contents)**

### Defining the Ticket Model
**[⬆ back to top](#table-of-contents)**

### Order Creation Logic
**[⬆ back to top](#table-of-contents)**

### Finding Reserved Tickets
**[⬆ back to top](#table-of-contents)**

### Convenience Document Methods
**[⬆ back to top](#table-of-contents)**

### Order Expiration Times
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
