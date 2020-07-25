## **Section 21: Handling Payments**

## Table of Contents
- [**Section 21: Handling Payments**](#section-21-handling-payments)
- [Table of Contents](#table-of-contents)
  - [The Payments Service](#the-payments-service)
  - [Initial Setup](#initial-setup)
  - [Replicated Fields](#replicated-fields)
  - [Another Order Model!](#another-order-model)
  - [Update-If-Current](#update-if-current)
  - [Replicating Orders](#replicating-orders)
  - [Testing Order Creation](#testing-order-creation)
  - [Marking an Order as Cancelled](#marking-an-order-as-cancelled)
  - [Cancelled Testing](#cancelled-testing)
  - [Starting the Listeners](#starting-the-listeners)
  - [Payments Flow with Stripe](#payments-flow-with-stripe)
  - [Implementing the Create Charge Handler](#implementing-the-create-charge-handler)
  - [Validating Order Payment](#validating-order-payment)
  - [Testing Order Validation Before Payment](#testing-order-validation-before-payment)
  - [Testing Same-User Validation](#testing-same-user-validation)
  - [Stripe Setup](#stripe-setup)
  - [Creating a Stripe Secret](#creating-a-stripe-secret)
  - [Creating a Charge with Stripe](#creating-a-charge-with-stripe)
  - [Manual Testing of Payments](#manual-testing-of-payments)
  - [Automated Payment Testing](#automated-payment-testing)
  - [Mocked Stripe Client](#mocked-stripe-client)
  - [A More Realistic Test Setup](#a-more-realistic-test-setup)
  - [Realistic Test Implementation](#realistic-test-implementation)
  - [Tying an Order and Charge Together](#tying-an-order-and-charge-together)
  - [Testing Payment Creation](#testing-payment-creation)
  - [Publishing a Payment Created Event](#publishing-a-payment-created-event)
  - [More on Publishing](#more-on-publishing)
  - [Marking an Order as Complete](#marking-an-order-as-complete)

### The Payments Service
**[⬆ back to top](#table-of-contents)**

### Initial Setup
**[⬆ back to top](#table-of-contents)**

### Replicated Fields
**[⬆ back to top](#table-of-contents)**

### Another Order Model!
**[⬆ back to top](#table-of-contents)**

### Update-If-Current
**[⬆ back to top](#table-of-contents)**

### Replicating Orders
**[⬆ back to top](#table-of-contents)**

### Testing Order Creation
**[⬆ back to top](#table-of-contents)**

### Marking an Order as Cancelled
**[⬆ back to top](#table-of-contents)**

### Cancelled Testing
**[⬆ back to top](#table-of-contents)**

### Starting the Listeners
**[⬆ back to top](#table-of-contents)**

### Payments Flow with Stripe
**[⬆ back to top](#table-of-contents)**

### Implementing the Create Charge Handler
**[⬆ back to top](#table-of-contents)**

### Validating Order Payment
**[⬆ back to top](#table-of-contents)**

### Testing Order Validation Before Payment
**[⬆ back to top](#table-of-contents)**

### Testing Same-User Validation
**[⬆ back to top](#table-of-contents)**

### Stripe Setup
**[⬆ back to top](#table-of-contents)**

### Creating a Stripe Secret
**[⬆ back to top](#table-of-contents)**

### Creating a Charge with Stripe
**[⬆ back to top](#table-of-contents)**

### Manual Testing of Payments
**[⬆ back to top](#table-of-contents)**

### Automated Payment Testing
**[⬆ back to top](#table-of-contents)**

### Mocked Stripe Client
**[⬆ back to top](#table-of-contents)**

### A More Realistic Test Setup
**[⬆ back to top](#table-of-contents)**

### Realistic Test Implementation
**[⬆ back to top](#table-of-contents)**

### Tying an Order and Charge Together
**[⬆ back to top](#table-of-contents)**

### Testing Payment Creation
**[⬆ back to top](#table-of-contents)**

### Publishing a Payment Created Event
**[⬆ back to top](#table-of-contents)**

### More on Publishing
**[⬆ back to top](#table-of-contents)**

### Marking an Order as Complete
**[⬆ back to top](#table-of-contents)**