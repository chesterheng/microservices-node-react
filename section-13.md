## **Section 13: Create-Read-Update-Destroy Server Setup**

## Table of Contents
- [**Section 13: Create-Read-Update-Destroy Server Setup**](#section-13-create-read-update-destroy-server-setup)
- [Table of Contents](#table-of-contents)
  - [Ticketing Service Overview](#ticketing-service-overview)
  - [Project Setup](#project-setup)
  - [Running the Ticket Service](#running-the-ticket-service)
  - [Mongo Connection URI](#mongo-connection-uri)
  - [Quick Auth Update](#quick-auth-update)
  - [Test-First Approach](#test-first-approach)
  - [Creating the Router](#creating-the-router)
  - [Adding Auth Protection](#adding-auth-protection)
  - [Faking Authentication During Tests](#faking-authentication-during-tests)
  - [Building a Session](#building-a-session)
  - [Testing Request Validation](#testing-request-validation)
  - [Validating Title and Price](#validating-title-and-price)
  - [Reminder on Mongoose with TypeScript](#reminder-on-mongoose-with-typescript)
  - [Defining the Ticket Model](#defining-the-ticket-model)
  - [Creation via Route Handler](#creation-via-route-handler)
  - [Testing Show Routes](#testing-show-routes)
  - [Unexpected Failure!](#unexpected-failure)
  - [What's that Error?!](#whats-that-error)
  - [Better Error Logging](#better-error-logging)
  - [Complete Index Route Implementation](#complete-index-route-implementation)
  - [Ticket Updating](#ticket-updating)
  - [Handling Updates](#handling-updates)
  - [Permission Checking](#permission-checking)
  - [Final Update Changes](#final-update-changes)
  - [Manual Testing](#manual-testing)

### Ticketing Service Overview

![](section-13/tickets-service.jpg)
![](section-13/tickets-service-mongo-db.jpg)

Steps

- Create package.json, install deps
- Write Dockerfile
- Create index.ts to run project
- Build image, push to docker hub
- Write k8s file for deployment, service
- Update skaffold.yaml to do file sync for tickets
- Write k8s file for Mongodb deployment, service

Copy from auth service to save time!

- Create package.json, install deps
- Write Dockerfile
- Create index.ts to run project

**[⬆ back to top](#table-of-contents)**

### Project Setup

- Build image, push to docker hub
```console
docker build -t chesterheng/tickets .
docker push chesterheng/tickets
```

**[⬆ back to top](#table-of-contents)**

### Running the Ticket Service
**[⬆ back to top](#table-of-contents)**

### Mongo Connection URI
**[⬆ back to top](#table-of-contents)**

### Quick Auth Update
**[⬆ back to top](#table-of-contents)**

### Test-First Approach
**[⬆ back to top](#table-of-contents)**

### Creating the Router
**[⬆ back to top](#table-of-contents)**

### Adding Auth Protection
**[⬆ back to top](#table-of-contents)**

### Faking Authentication During Tests
**[⬆ back to top](#table-of-contents)**

### Building a Session
**[⬆ back to top](#table-of-contents)**

### Testing Request Validation
**[⬆ back to top](#table-of-contents)**

### Validating Title and Price
**[⬆ back to top](#table-of-contents)**

### Reminder on Mongoose with TypeScript
**[⬆ back to top](#table-of-contents)**

### Defining the Ticket Model
**[⬆ back to top](#table-of-contents)**

### Creation via Route Handler
**[⬆ back to top](#table-of-contents)**

### Testing Show Routes
**[⬆ back to top](#table-of-contents)**

### Unexpected Failure!
**[⬆ back to top](#table-of-contents)**

### What's that Error?!
**[⬆ back to top](#table-of-contents)**

### Better Error Logging
**[⬆ back to top](#table-of-contents)**

### Complete Index Route Implementation
**[⬆ back to top](#table-of-contents)**

### Ticket Updating
**[⬆ back to top](#table-of-contents)**

### Handling Updates
**[⬆ back to top](#table-of-contents)**

### Permission Checking
**[⬆ back to top](#table-of-contents)**

### Final Update Changes
**[⬆ back to top](#table-of-contents)**

### Manual Testing
**[⬆ back to top](#table-of-contents)**