# Microservices with Node JS and React

## Table of Contents

- [Microservices with Node JS and React](#microservices-with-node-js-and-react)
  - [Table of Contents](#table-of-contents)
  - [**Section 01: Fundamental Ideas Around Microservices**](#section-01-fundamental-ideas-around-microservices)
    - [What Is a Microservice?](#what-is-a-microservice)
    - [Data in Microservices](#data-in-microservices)
    - [Big Problems with Data](#big-problems-with-data)
    - [Sync Communication Between Services](#sync-communication-between-services)
    - [Async: Event-Based Communication](#async-event-based-communication)
    - [Async: A Crazy Way of Storing Data](#async-a-crazy-way-of-storing-data)
    - [Pros and Cons of Async Communication](#pros-and-cons-of-async-communication)
  - [**A Mini-Microservices App**](#a-mini-microservices-app)
  - [**Running Services with Docker**](#running-services-with-docker)
  - [**Orchestrating Collections of Services with Kubernetes**](#orchestrating-collections-of-services-with-kubernetes)
  - [**Architecture of Multi-Service Apps**](#architecture-of-multi-service-apps)
  - [**Leveraging a Cloud Environment for Development**](#leveraging-a-cloud-environment-for-development)
  - [**Response Normalization Strategies**](#response-normalization-strategies)
  - [**Database Management and Modeling**](#database-management-and-modeling)
  - [**Authentication Strategies and Options**](#authentication-strategies-and-options)
  - [**Testing Isolated Microservices**](#testing-isolated-microservices)
  - [**Integrating a Server-Side-Rendered React App**](#integrating-a-server-side-rendered-react-app)
  - [**Code Sharing and Reuse Between Services**](#code-sharing-and-reuse-between-services)
  - [**Create-Read-Update-Destroy Server Setup**](#create-read-update-destroy-server-setup)
  - [**NATS Streaming Server - An Event Bus Implementation**](#nats-streaming-server---an-event-bus-implementation)
  - [**Connecting to NATS in a Node JS World**](#connecting-to-nats-in-a-node-js-world)
  - [**Managing a NATS Client**](#managing-a-nats-client)
  - [**Cross-Service Data Replication In Action**](#cross-service-data-replication-in-action)
  - [**Understanding Event Flow**](#understanding-event-flow)
  - [**Listening for Events and Handling Concurrency Issues**](#listening-for-events-and-handling-concurrency-issues)
  - [**Worker Services**](#worker-services)
  - [**Handling Payments**](#handling-payments)
  - [**Back to the Client**](#back-to-the-client)
  - [**CI/CD**](#cicd)

## **Section 01: Fundamental Ideas Around Microservices**

### What Is a Microservice?

A monolith contains

- Routing
- Middleware
- Business Logic
- Database access
to implement all features of our app

![](section-01/monolith-server.jpg)

A single microservice contains

- Routing
- Middleware
- Business Logic
- Database access
to implement one feature of our app

![](section-01/single-microservice.jpg)

**[⬆ back to top](#table-of-contents)**

### Data in Microservices

Data management between services

- This is the big problem of microservices, and what 90% of this course focuses on

With microservices, we store and access data in sort of strange way. Let's look at 

- how we store data: Each service gets its own database (if it needs one) 
- how we access it: Services will never, ever reach into another services database

![](section-01/store-data.jpg)
![](section-01/access-data.jpg)

Why Database-Per-Service pattern?

- We want each service to run independently of other services
![](section-01/common-database.jpg)
![](section-01/service-dependent.jpg)
- Database schema/structure might change unexpectedly
![](section-01/schema-change.jpg)
- Some services might function more efficiently with different types of DB's (sql vs nosql)

**[⬆ back to top](#table-of-contents)**

### Big Problems with Data

![](section-01/basic-ecommerce-app.jpg)
![](section-01/monolithic-server-example.jpg)
![](section-01/monolithic-server-addon.jpg)
![](section-01/microservices-addon.jpg)

**[⬆ back to top](#table-of-contents)**

### Sync Communication Between Services

Communication Strategies Between Services
- Sync: Services communicate with each other using direct requests
- Async: Services communicate with each other using events

Notes on Sync Communication
| Pro                              | Con                                                           |
| -------------------------------- | ------------------------------------------------------------- |
| Conceptually easy to understand! | Introduces a dependency between services                      |
| Service D won't need a database! | If any inter-service request fails, the overall request fails |
|                                  | The entire request is only as fast as the slowest request     |
|                                  | Can easily introduce webs of requests                         |

![](section-01/sync-communication.jpg)
![](section-01/webs-of-requests.jpg)

**[⬆ back to top](#table-of-contents)**

### Async: Event-Based Communication

![](section-01/event-bus.jpg)

**[⬆ back to top](#table-of-contents)**

### Async: A Crazy Way of Storing Data

Service D: Code to show products ordered by a particular user
Let's refine the exact goal of this service
Service D: Given the ID of a user, show the title and image for every product they have ever ordered

![](section-01/service-d-db.jpg)
![](section-01/service-d-db-implement.jpg)
![](section-01/request-create-product.jpg)
![](section-01/request-signup.jpg)
![](section-01/request-order-product.jpg)

**[⬆ back to top](#table-of-contents)**

### Pros and Cons of Async Communication

| Pros                                               | Cons                 |
| -------------------------------------------------- | -------------------- |
| Service D has zero dependencies on other services! | Data duplication.    |
| Service D will be extremely fast!                  | Harder to understand |

**[⬆ back to top](#table-of-contents)**

## **A Mini-Microservices App**

**[⬆ back to top](#table-of-contents)**

## **Running Services with Docker**

**[⬆ back to top](#table-of-contents)**

## **Orchestrating Collections of Services with Kubernetes**

**[⬆ back to top](#table-of-contents)**

## **Architecture of Multi-Service Apps**

**[⬆ back to top](#table-of-contents)**

## **Leveraging a Cloud Environment for Development**

**[⬆ back to top](#table-of-contents)**

## **Response Normalization Strategies**

**[⬆ back to top](#table-of-contents)**

## **Database Management and Modeling**

**[⬆ back to top](#table-of-contents)**

## **Authentication Strategies and Options**

**[⬆ back to top](#table-of-contents)**

## **Testing Isolated Microservices**

**[⬆ back to top](#table-of-contents)**

## **Integrating a Server-Side-Rendered React App**

**[⬆ back to top](#table-of-contents)**

## **Code Sharing and Reuse Between Services**

**[⬆ back to top](#table-of-contents)**

## **Create-Read-Update-Destroy Server Setup**

**[⬆ back to top](#table-of-contents)**

## **NATS Streaming Server - An Event Bus Implementation**

**[⬆ back to top](#table-of-contents)**

## **Connecting to NATS in a Node JS World**

**[⬆ back to top](#table-of-contents)**

## **Managing a NATS Client**

**[⬆ back to top](#table-of-contents)**

## **Cross-Service Data Replication In Action**

**[⬆ back to top](#table-of-contents)**

## **Understanding Event Flow**

**[⬆ back to top](#table-of-contents)**

## **Listening for Events and Handling Concurrency Issues**

**[⬆ back to top](#table-of-contents)**

## **Worker Services**

**[⬆ back to top](#table-of-contents)**

## **Handling Payments**

**[⬆ back to top](#table-of-contents)**

## **Back to the Client**

**[⬆ back to top](#table-of-contents)**

## **CI/CD**

**[⬆ back to top](#table-of-contents)**
