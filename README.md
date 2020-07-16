# Microservices with Node JS and React Study Guide

## Table of Contents

- [Microservices with Node JS and React Study Guide](#microservices-with-node-js-and-react-study-guide)
  - [Table of Contents](#table-of-contents)
  - [**Section 01: Fundamental Ideas Around Microservices**](#section-01-fundamental-ideas-around-microservices)
    - [What Is a Microservice?](#what-is-a-microservice)
    - [Data in Microservices](#data-in-microservices)
    - [Big Problems with Data](#big-problems-with-data)
    - [Sync Communication Between Services](#sync-communication-between-services)
    - [Async: Event-Based Communication](#async-event-based-communication)
    - [Async: A Crazy Way of Storing Data](#async-a-crazy-way-of-storing-data)
    - [Pros and Cons of Async Communication](#pros-and-cons-of-async-communication)
  - [**Section 02: A Mini-Microservices App**](#section-02-a-mini-microservices-app)
    - [App Overview](#app-overview)
    - [Project Setup](#project-setup)
    - [Posts Service Creation](#posts-service-creation)
    - [Implementing a Comments Service](#implementing-a-comments-service)
    - [React Project Setup](#react-project-setup)
    - [Request Minimization Strategies](#request-minimization-strategies)
    - [An Async Solution](#an-async-solution)
    - [Common Questions Around Async Events](#common-questions-around-async-events)
    - [Event Bus Overview](#event-bus-overview)
    - [A Basic Event Bus Implementation](#a-basic-event-bus-implementation)
    - [Emitting Post Creation Events](#emitting-post-creation-events)
    - [Emitting Comment Creation Events](#emitting-comment-creation-events)
    - [Receiving Events](#receiving-events)
    - [Creating the Data Query Service](#creating-the-data-query-service)
    - [Parsing Incoming Events](#parsing-incoming-events)
    - [Using the Query Service](#using-the-query-service)
    - [Adding a Simple Feature](#adding-a-simple-feature)
    - [Issues with Comment Filtering](#issues-with-comment-filtering)
    - [A Second Approach](#a-second-approach)
    - [How to Handle Resource Updates](#how-to-handle-resource-updates)
    - [Creating the Moderation Service](#creating-the-moderation-service)
    - [Adding Comment Moderation](#adding-comment-moderation)
    - [Handling Moderation](#handling-moderation)
    - [Updating Comment Content](#updating-comment-content)
    - [Dealing with Missing Events](#dealing-with-missing-events)
  - [**Section 03: Running Services with Docker**](#section-03-running-services-with-docker)
    - [Deployment Issues](#deployment-issues)
    - [Why Docker?](#why-docker)
    - [Why Kubernetes?](#why-kubernetes)
    - [Dockerizing the Posts Service](#dockerizing-the-posts-service)
    - [Review Some Basic Commands](#review-some-basic-commands)
    - [Dockering Other Services](#dockering-other-services)
  - [**Section 04: Orchestrating Collections of Services with Kubernetes**](#section-04-orchestrating-collections-of-services-with-kubernetes)
    - [Installing Kubernetes](#installing-kubernetes)
    - [A Kubernetes Tour](#a-kubernetes-tour)
    - [Important Kubernetes Terminology](#important-kubernetes-terminology)
    - [Notes on Config Files](#notes-on-config-files)
    - [Creating a Pod](#creating-a-pod)
    - [Understanding a Pod Spec](#understanding-a-pod-spec)
    - [Common Kubectl Commands](#common-kubectl-commands)
    - [Introducing Deployments](#introducing-deployments)
    - [Creating a Deployment](#creating-a-deployment)
    - [Common Commands Around Deployments](#common-commands-around-deployments)
    - [Updating Deployments](#updating-deployments)
    - [Preferred Method for Updating Deployments](#preferred-method-for-updating-deployments)
    - [Networking With Services](#networking-with-services)
    - [Creating a NodePort Service](#creating-a-nodeport-service)
    - [Accessing NodePort Services](#accessing-nodeport-services)
    - [Setting Up Cluster IP Services](#setting-up-cluster-ip-services)
    - [Building a Deployment for the Event Bus](#building-a-deployment-for-the-event-bus)
    - [Adding ClusterIP Services](#adding-clusterip-services)
    - [How to Communicate Between Services](#how-to-communicate-between-services)
    - [Updating Service Addresses](#updating-service-addresses)
    - [Verifying Communication](#verifying-communication)
    - [Adding Query, Moderation and Comments](#adding-query-moderation-and-comments)
    - [Testing Communication](#testing-communication)
    - [Load Balancer Services](#load-balancer-services)
    - [Load Balancers and Ingress](#load-balancers-and-ingress)
    - [Installing Ingress-Nginx](#installing-ingress-nginx)
    - [Writing Ingress Config Files](#writing-ingress-config-files)
    - [Hosts File Tweak](#hosts-file-tweak)
    - [Quick Note](#quick-note)
    - [Deploying the React App](#deploying-the-react-app)
    - [Unique Route Paths](#unique-route-paths)
    - [Final Route Config](#final-route-config)
    - [Introducing Skaffold](#introducing-skaffold)
    - [Skaffold Setup](#skaffold-setup)
    - [First Time Skaffold Startup](#first-time-skaffold-startup)
    - [A Few Notes on Skaffold](#a-few-notes-on-skaffold)
  - [**Section 05: Architecture of Multi-Service Apps**](#section-05-architecture-of-multi-service-apps)
    - [Big Ticket Items](#big-ticket-items)
    - [Ticketing App Overview](#ticketing-app-overview)
    - [Resource Types](#resource-types)
    - [Service Types](#service-types)
    - [Events and Architecture Design](#events-and-architecture-design)
    - [Auth Service Setup](#auth-service-setup)
    - [Auth K8s Setup](#auth-k8s-setup)
    - [Adding Skaffold](#adding-skaffold)
    - [Ingress-Nginx Setup](#ingress-nginx-setup)
    - [Hosts File and Security Warning](#hosts-file-and-security-warning)
  - [**Section 06: Leveraging a Cloud Environment for Development**](#section-06-leveraging-a-cloud-environment-for-development)
    - [Note on Remote Development](#note-on-remote-development)
    - [Remote Dev with Skaffold](#remote-dev-with-skaffold)
    - [Google Cloud Initial Setup](#google-cloud-initial-setup)
    - [Kubernetes Cluster Creation](#kubernetes-cluster-creation)
    - [Kubectl Contexts](#kubectl-contexts)
    - [Initializing the GCloud SDK](#initializing-the-gcloud-sdk)
    - [Installing the GCloud Context](#installing-the-gcloud-context)
    - [Updating the Skaffold Config](#updating-the-skaffold-config)
    - [More Skaffold Updates](#more-skaffold-updates)
    - [Creating a Load Balancer](#creating-a-load-balancer)
    - [Final Config and Test](#final-config-and-test)
  - [**Section 07: Response Normalization Strategies**](#section-07-response-normalization-strategies)
    - [Creating Route Handlers](#creating-route-handlers)
    - [Scaffolding Routes](#scaffolding-routes)
    - [Adding Validation](#adding-validation)
    - [Handling Validation Errors](#handling-validation-errors)
    - [Surprising Complexity Around Errors](#surprising-complexity-around-errors)
    - [Other Sources of Errors](#other-sources-of-errors)
    - [Solution for Error Handling](#solution-for-error-handling)
    - [Building an Error Handling Middleware](#building-an-error-handling-middleware)
    - [Communicating More Info to the Error Handler](#communicating-more-info-to-the-error-handler)
    - [Encoding More Information In an Error](#encoding-more-information-in-an-error)
    - [Subclassing for Custom Errors](#subclassing-for-custom-errors)
    - [Determining Error Type](#determining-error-type)
    - [Converting Errors to Responses](#converting-errors-to-responses)
    - [Moving Logic Into Errors](#moving-logic-into-errors)
    - [Verifying Our Custom Errors](#verifying-our-custom-errors)
    - [Final Error Related Code](#final-error-related-code)
    - [How to Define New Custom Errors](#how-to-define-new-custom-errors)
    - [Uh Oh... Async Error Handling](#uh-oh-async-error-handling)
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

## **Section 02: A Mini-Microservices App**

### App Overview

Goals

- Get a taste of a microservices architecture
- Build as much as possible from scratch

![](section-02/app-overview-1.jpg)
![](section-02/app-overview-2.jpg)

What services should we create?

- For now, we will create one separate service for each resource in our app

![](section-02/what-services.jpg)
![](section-02/service-per-resource.jpg)

**[⬆ back to top](#table-of-contents)**

### Project Setup

![](section-02/project-setup.jpg)

Initial App Setup

- Generate a new React App using Create-React-App
- Create an Express-based project for the Posts Service
- Create an Express-based project for the Comments Service

**[⬆ back to top](#table-of-contents)**

### Posts Service Creation

![](section-02/posts-service.jpg)

**[⬆ back to top](#table-of-contents)**

### Implementing a Comments Service

![](section-02/comments-service.jpg)
![](section-02/comments-by-post-id.jpg)

**[⬆ back to top](#table-of-contents)**

### React Project Setup

![](section-02/react-client.jpg)

**[⬆ back to top](#table-of-contents)**

### Request Minimization Strategies

![](section-02/array-of-requests.jpg)
![](section-02/monoliths-solution.jpg)
![](section-02/microservices-solution.jpg)
![](section-02/sync-communication.jpg)

Notes on Sync Communication

| Pro                              | Con                                                           |
| -------------------------------- | ------------------------------------------------------------- |
| Conceptually easy to understand! | Introduces a dependency between services                      |
|                                  | If any inter-service request fails, the overall request fails |
|                                  | The entire request is only as fast as the slowest request     |
|                                  | Can easily introduce webs of requests                         |

**[⬆ back to top](#table-of-contents)**

### An Async Solution

![](section-02/async-communication.jpg)
![](section-02/async-communication-step-1.jpg)
![](section-02/async-communication-step-2.jpg)
![](section-02/async-communication-step-3.jpg)
![](section-02/async-communication-step-4.jpg)
![](section-02/async-communication-step-5.jpg)

Notes on Async Communication

| Pros                                                   | Cons                 |
| ------------------------------------------------------ | -------------------- |
| Query Service has zero dependencies on other services! | Data duplication.    |
| Query Service will be extremely fast!                  | Harder to understand |

**[⬆ back to top](#table-of-contents)**

### Common Questions Around Async Events


Wait, so you're saying we need to create a new service every time we need to join some data?!?!?!?!?!?
> Absolutely not!  In reality, might not even have posts and comments in separate services in the first place

Who cares that each service is independent?
> Independent services + the reliability that brings is one of the core reasons of using microservices in the first place

This is so over the top complicated for little benefit
> Seems that way now!  Adding in some features starts to get really easy when we use this architecture

This system won't correctly in the following scenario....
> There are some very special things we need to consider with this design.  I've got solutions for most (maybe?) of the concerns you may have

**[⬆ back to top](#table-of-contents)**

### Event Bus Overview

Event Bus

- Many different implementations. RabbitMQ, Kafka, NATS...
- Receives events, publishes them to listeners
- Many different subtle features that make async communication way easier or way harder
- We are going to build our own event bus using Express. It will not implement the vast majority of features a normal bus has.
- Yes, for our next app we will use a production grade, open source event bus

![](section-02/event-bus-overview-1.jpg)

**[⬆ back to top](#table-of-contents)**

### A Basic Event Bus Implementation

![](section-02/event-bus-overview-2.jpg)

```javascript
// event-bus/index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
```

**[⬆ back to top](#table-of-contents)**

### Emitting Post Creation Events

![](section-02/emit-post-creation-events.jpg)

```javascript
// posts/index.js
const posts = {};
app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title
    }
  });

  res.status(201).send(posts[id]);
});
```

**[⬆ back to top](#table-of-contents)**

### Emitting Comment Creation Events

![](section-02/emit-comment-creation-events.jpg)

```javascript
// comments/index.js
const commentsByPostId = {};
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id
    }
  });

  res.status(201).send(comments);
});
```

**[⬆ back to top](#table-of-contents)**

### Receiving Events

```javascript
// posts/index.js
// comments/index.js
app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);

  res.send({});
});
```

**[⬆ back to top](#table-of-contents)**

### Creating the Data Query Service

![](section-02/query-service.jpg)

```javascript
// query/index.js
app.get('/posts', (req, res) => {});
app.post('/events', (req, res) => {});
```

**[⬆ back to top](#table-of-contents)**

### Parsing Incoming Events

```javascript
// query/index.js
app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }

  console.log(posts);

  res.send({});
});
```

**[⬆ back to top](#table-of-contents)**

### Using the Query Service

![](section-02/react-query-service.jpg)

**[⬆ back to top](#table-of-contents)**

### Adding a Simple Feature

Feature Request

- Add in comment moderation.
- Flag comments that contain the word 'orange'.

Feature Clarifications

- Super easy to implement in the React app, but not if the filter list changes frequently
- Super easy to implement in the existing comments service, but let's assume we want to add a new service
- It might take a long time for the new service to moderate a comment.

![](section-02/add-filter-feature.jpg)
![](section-02/comment-new-shape.jpg)

**[⬆ back to top](#table-of-contents)**

### Issues with Comment Filtering

![](section-02/moderation-service-1.jpg)

**[⬆ back to top](#table-of-contents)**

### A Second Approach

![](section-02/moderation-service-2.jpg)

- The query service is about presentation logic
- It is joining two resources right now (posts and comments), but it might join 10!
- Does it make sense for a presentation service to understand how to process a very precise update?

![](section-02/process-update.jpg)
![](section-02/query-service-update.jpg)
![](section-02/multi-services-update.jpg)

**[⬆ back to top](#table-of-contents)**

### How to Handle Resource Updates

![](section-02/handle-resources-update.jpg)
![](section-02/moderation-service-3.jpg)

**[⬆ back to top](#table-of-contents)**

### Creating the Moderation Service

```javascript
// moderation/index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
```

**[⬆ back to top](#table-of-contents)**

### Adding Comment Moderation

![](section-02/comment-created.jpg)

**[⬆ back to top](#table-of-contents)**

### Handling Moderation

![](section-02/comment-moderated.jpg)

**[⬆ back to top](#table-of-contents)**

### Updating Comment Content

![](section-02/comment-updated.jpg)

**[⬆ back to top](#table-of-contents)**

### Dealing with Missing Events

![](section-02/missing-1.jpg)
![](section-02/missing-2.jpg)
![](section-02/solution-1.jpg)
![](section-02/solution-2.jpg)
![](section-02/solution-3.jpg)

**[⬆ back to top](#table-of-contents)**

## **Section 03: Running Services with Docker**

### Deployment Issues

![](section-03/01-your-computer.jpg)
![](section-03/02-virtual-machine.jpg)
![](section-03//03-scale-virtual-machine.jpg)
```javascript
// event-bus/index.js
app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);

  axios.post('http://localhost:4006/events', event);
  axios.post('http://localhost:4007/events', event);

  res.send({ status: 'OK' });
});
```

![](section-03/04-second-virtual-machine.jpg)
```javascript
// event-bus/index.js
app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);

  if(it is not 1 am) {
    axios.post('http://181.143.203.151/events', event);
    axios.post('http://181.143.203.152/events', event);
  }

  res.send({ status: 'OK' });
});
```

**[⬆ back to top](#table-of-contents)**

### Why Docker?

Issues

- Running our app right now makes big assumptions about our environment
- Running our app requires precise knowledge of how to start it (npm start)

Docker solves both these issues

- Containers wrap up everything that is needed for a program + how to start and run it
![](section-03/05-docker-container.jpg)

**[⬆ back to top](#table-of-contents)**

### Why Kubernetes?

Kubernetes is a tool for running a bunch of different containers
We give it some configuration to describe how we want our containers to run and interact with each other

![](section-03/06-kubernetes-cluster.jpg)

**[⬆ back to top](#table-of-contents)**

### Dockerizing the Posts Service

Here is the format of the Dockerfile:

| INSTRUCTION | arguments        | Comment                                              |
| ----------- | ---------------- | ---------------------------------------------------- |
| FROM        | node:alpine      | Specify base image                                   |
| WORKDIR     | /app             | Set the working directory to '/app' in the container |
| COPY        | package.json ./  | Copy over only the package.json file                 |
| RUN         | npm install      | Install all dependencies                             |
| COPY        | ./ ./            | Copy over all of our remaining source code           |
| CMD         | ["npm", "start"] | Set the command to run when the container starts up  |


**[⬆ back to top](#table-of-contents)**

### Review Some Basic Commands

| Docker Commands                              | Explanation                                                                                     |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| docker build -t chesterheng/posts .          | Build an image based on the dockerfile in the current directory.  Tag it as 'chesterheng/posts' |
| docker run [image id or image tag]           | Create and start a container based on the provided image id or tag                              |
| docker run -it [image id or image tag] [cmd] | Create and start container, but also override the default command                               |
| docker ps                                    | Print out information about all of the running containers                                       |
| docker exec -it [container id] [cmd]         | Execute the given command in a running container                                                |
| docker logs [container id]                   | Print out logs from the given container                                                         |

```console
cd section-03/blog/posts
docker build -t chesterheng/posts .
docker run chesterheng/posts
docker run -it chesterheng/posts sh
docker ps
docker exec -it a643fdbf134e sh
docker logs a643fdbf134e
```
**[⬆ back to top](#table-of-contents)**

### Dockering Other Services

```console
cd section-03/blog/event-bus
docker build -t chesterheng/event-bus .
docker run chesterheng/event-bus
docker run -it chesterheng/posts sh
docker ps
docker exec -it a643fdbf134e sh
docker logs a643fdbf134e
``` 

**[⬆ back to top](#table-of-contents)**

## **Section 04: Orchestrating Collections of Services with Kubernetes**

### Installing Kubernetes

Kubernetes Setup

- Running Docker for Mac/Windows? Yay, so easy
![](section-04/kubernetes-setup.jpg)
- Running Docker-Toolbox or Linux? kubernetes.io/docs/tasks/tools/install-minikube/

**[⬆ back to top](#table-of-contents)**

### A Kubernetes Tour

```console
kubectl version
```
Create Docker Image

![](section-04/create-docker-image.jpg)

Kubernetes Cluster
![](section-04/kubernetes-cluster.jpg)


**[⬆ back to top](#table-of-contents)**

### Important Kubernetes Terminology

| Keyword            | Meaning                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| Kubernetes Cluster | A collections of nodes + a master to manage them                                                     |
| Node               | A virtual machine that will run our containers                                                       |
| Pod                | More or less a running container.  Technically, a pod can run multiple containers (we won't do this) |
| Deployment         | Monitors a set of pods, make sure they are running and restarts them if they crash                   |
| Service            | Provides an easy-to-remember URL to access a running container                                       |

**[⬆ back to top](#table-of-contents)**

### Notes on Config Files

- Tells Kubernetes about the different Deployments, Pods, and Services (referred to as 'Objects') that we want to create
- Written in YAML syntax
- Always store these files with our project source code - they are documentation!
- We can create Objects without config files - do not do this.  Config files provide a precise definition of what your cluster is running.
  - Kubernetes docs will tell you to run direct commands to create objects - only do this for testing purposes
  - Blog posts will tell you to run direct commands to create objects - close the blog post!

**[⬆ back to top](#table-of-contents)**

### Creating a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: posts
spec:
  containers:
    - name: posts
      image: chesterheng/posts:0.0.1
```

```console
cd section-04/blog/posts/
docker build -t chesterheng/posts:0.0.1 .
cd ../infra/k8s/
kubectl apply -f posts.yaml
kubectl get pods
```

**[⬆ back to top](#table-of-contents)**

### Understanding a Pod Spec

| Configuration Parameters       | Notes                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| apiVersion: v1                 | K8s is extensible - we can add in our own custom objects.  This specifies the set of objects we want K8s to look at |
| kind: Pod                      | The type of object we want to create                                                                                |
| metadata:                      | Config options for the object we are about to create                                                                |
| name: posts                    | When the pod is created, give it a name of 'posts'                                                                  |
| spec:                          | The exact attributes we want to apply to the object we are about to create                                          |
| containers:                    | We can create many containers in a single pod                                                                       |
| - name: posts                  | Make a container with a name of 'posts'                                                                             |
| image: chesterheng/posts:0.0.1 | The exact image we want to use                                                                                      |

**[⬆ back to top](#table-of-contents)**

### Common Kubectl Commands

| Docker World                         | K8s World                         |
| ------------------------------------ | --------------------------------- |
| docker ps                            | kubectl get pods                  |
| docker exec -it [container id] [cmd] | kubectl exec -it [pod_name] [cmd] |
| docker logs [container id]           | kubectl logs [pod_name]           |

| K8s Commands                        | Explanation                                         |
| ----------------------------------- | --------------------------------------------------- |
| kubectl get pods                    | Print out information about all of the running pods |
| kubectl exec -it [pod_name] [cmd]   | Execute the given command in a running pod          |
| kubectl logs [pod_name]             | Print out logs from the given pod                   |
| kubectl delete pod [pod_name]       | Deletes the given pod                               |
| kubectl apply -f [config file name] | Tells kubernetes to process the config              |
| kubectl describe pod [pod_name]     | Print out some information about the running pod    |

```console
cd section-04/blog/infra/k8s/
kubectl apply -f posts.yaml
kubectl get pods
kubectl exec -it posts sh
kubectl logs posts
kubectl delete pod posts
kubectl get pods
kubectl apply -f posts.yaml
kubectl get pods
kubectl describe pod posts
```

**[⬆ back to top](#table-of-contents)**

### Introducing Deployments

![](section-04/deployment-1.jpg)

**[⬆ back to top](#table-of-contents)**

### Creating a Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: posts-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: posts
  template:
    metadata:
      labels:
        app: posts
    spec:
      containers:
        - name: posts
          image: chesterheng/posts:0.0.1
```

```console
cd section-04/blog/infra/k8s/
kubectl apply -f posts-depl.yaml
```

**[⬆ back to top](#table-of-contents)**

### Common Commands Around Deployments

| Deployment Commands                            | Explanation                                                                                                      |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| kubectl get deployments                        | List all the running deployments                                                                                 |
| kubectl describe deployment [depl name]        | Print out details about a specific deployment                                                                    |
| kubectl apply -f [config file name]            | Create a deployment out of a config file                                                                         |
| kubectl delete deployment [depl_name]          | Delete a deployment                                                                                              |
| kubectl rollout restart deployment [depl_name] | Get a deployment to restart all pods.  Will use latest version of an image if the pod spec has a tag of 'latest' |

```console
cd section-04/blog/infra/k8s/
kubectl get deployments
kubectl get pods
kubectl delete pods posts-depl-75767489d-jrzxw
kubectl describe deployment posts-depl
kubectl delete deployment posts-depl
kubectl apply -f posts-depl.yaml
kubectl get deployments
kubectl get pods
```

**[⬆ back to top](#table-of-contents)**

### Updating Deployments

![](section-04/deployment-2.jpg)

Updating the Image Used By a Deployment - Method #1

- Step 1 - Make a change to your project code
- Step 2 - Rebuild the image, specifying a new image version
```console
cd section-04/blog/posts/
docker build -t chesterheng/posts:0.0.5 .
```
- Step 3 - In the deployment config file, update the version of the image
- Step 4 - Run the command: kubectl apply -f [depl file name]
```console
cd ../infra/k8s
kubectl apply -f posts-depl.yaml
kubectl get deployments
kubectl get pods
kubectl logs posts-depl-cf87458cd-lrn6f
```

**[⬆ back to top](#table-of-contents)**

### Preferred Method for Updating Deployments

Updating the Image Used By a Deployment - Method #2

- Step 1 - The deployment must be using the 'latest' tag in the pod spec section
  - image: chesterheng/posts:latest or 
  - image: chesterheng/posts
```console
cd section-04/blog/infra/k8s
kubectl apply -f posts-depl.yaml
kubectl get deployments
```
- Step 2 - Make an update to your code
- Step 3 - Build the image
```console
cd section-04/blog/posts
docker build -t chesterheng/posts .
```
- Step 4 - Push the image to docker hub
```console
docker login
docker push chesterheng/posts
```
[chesterheng/posts
](https://hub.docker.com/r/chesterheng/posts)
- Step 5 - Run the command: kubectl rollout restart deployment [depl_name]
```console
kubectl get deployments
kubectl rollout restart deployment posts-depl
kubectl get deployments
kubectl get pods
kubectl logs posts-depl-6947b4f9c-t5zx5
```

**[⬆ back to top](#table-of-contents)**

### Networking With Services

```console
kubectl get pods
kubectl logs posts-depl-6947b4f9c-t5zx5
```

![](section-04/service-1.jpg)
![](section-04/service-2.jpg)

| Types of Services | Explanation                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| Cluster IP        | Sets up an easy-to-remember URL to access a pod. Only exposes pods in the cluster                            |
| Node Port         | Makes a pod accessible from outside the cluster.  Usually only used for dev purposes                         |
| Load Balancer     | Makes a pod accessible from outside the cluster.  This is the right way to expose a pod to the outside world |
| External Name     | Redirects an in-cluster request to a CNAME url.....don't worry about this one....                            |

Cluster IP - node to node communication

![](section-04/cluster-ip-service.jpg)

Makes a pod accessible from outside the cluster (outside to node communication)

![](section-04/access-pod-from-outside-cluster.jpg)

**[⬆ back to top](#table-of-contents)**

### Creating a NodePort Service

![](section-04/nodeport-service.jpg)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: posts-srv
spec:
  type: NodePort
  selector:
    app: posts
  ports:
    - name: posts
      protocol: TCP
      port: 4000
      targetPort: 4000
```

**[⬆ back to top](#table-of-contents)**

### Accessing NodePort Services

```console
cd section-04/blog/infra/k8s/
kubectl apply -f posts-srv.yaml
kubectl get services
kubectl describe service posts-srv
```

![](section-04/nodeport-service-2.jpg)
![](section-04/ip-address.jpg)

```console
kubectl get pods
kubectl get svc -A
curl localhost:30692/posts
```

Error 
- curl: (7) Failed to connect to localhost port 30692: Connection refused

How to troubleshoot?

#1: Test to check if your container expose your app on http://localhost:4000 ?

```console
kubectl exec -it posts-depl-6947b4f9c-qbn4h sh
/app # apk add curl
/app # curl localhost:4000/posts
/app # curl http://posts-srv:4000/posts
```

#2: Test to check if your kubernetes service is ok ?

```console
kubectl exec -it posts-depl-6947b4f9c-qbn4h sh
/app # apk add curl
/app # curl http://posts-srv:4000/posts
```

#3: Check if the problem is coming from [kube-proxy](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy)?

```console
kubectl get pods -n kube-system
```

```console
NAME                                     READY   STATUS    RESTARTS   AGE
coredns-5644d7b6d9-b74mq                 1/1     Running   0          21d
coredns-5644d7b6d9-vrjfp                 1/1     Running   0          21d
etcd-docker-desktop                      1/1     Running   0          21d
kube-apiserver-docker-desktop            1/1     Running   0          21d
kube-controller-manager-docker-desktop   1/1     Running   0          21d
kube-proxy-k9wcv                         1/1     Running   0          21d
kube-scheduler-docker-desktop            1/1     Running   0          21d
storage-provisioner                      0/1     Evicted   0          21d
vpnkit-controller                        0/1     Evicted   0          21d
```

#4: Restart the evicted vpnkit-controller and storage-provisioner and resolve the docker-desktop bug

```console
<!-- check why vpnkit-controller is evicted? -->
kubectl describe pod vpnkit-controller -n kube-system
kubectl delete po storage-provisioner vpnkit-controller -n kube-system
```
- Disable and re-enable kubernetes integration (otherwise the pods are not being redeployed)
- If this doesn’t work, you can still hit the big red button “Reset Kubernetes Cluster” but you’ll have to redeploy your descriptors (deployment and service)

**[⬆ back to top](#table-of-contents)**

### Setting Up Cluster IP Services

![](section-04/cluster-ip-service-2.jpg)

**[⬆ back to top](#table-of-contents)**

### Building a Deployment for the Event Bus

Goals Moving Forward

- Build an image for the Event Bus
```console
cd section-04/blog/event-bus
docker build -t chesterheng/event-bus .
```
- Push the image to Docker Hub
```console
cd section-04/blog/event-bus
docker push chesterheng/event-bus
```
- Create a deployment for Event Bus
```console
cd section-04/blog/infra/k8s/
kubectl apply -f event-bus-depl.yaml
kubectl get pods
```
- Create a Cluster IP service for Event Bus and Posts
- Wire it all up!

**[⬆ back to top](#table-of-contents)**

### Adding ClusterIP Services

Goals Moving Forward

- Build an image for the Event Bus
- Push the image to Docker Hub
- Create a deployment for Event Bus
- Create a Cluster IP service for Event Bus and Posts
```console
cd section-04/blog/infra/k8s/
kubectl apply -f event-bus-depl.yaml
kubectl apply -f posts-depl.yaml
kubectl get services
```
- Wire it all up!

**[⬆ back to top](#table-of-contents)**

### How to Communicate Between Services

Goals Moving Forward

- Build an image for the Event Bus
- Push the image to Docker Hub
- Create a deployment for Event Bus
- Create a Cluster IP service for Event Bus and Posts
- Wire it all up!
![](section-04/communicate-between-services.jpg


**[⬆ back to top](#table-of-contents)**

### Updating Service Addresses

Updating the Image Used By a Deployment - Method #2

- Step 1 - The deployment must be using the 'latest' tag in 
- Step 2 - Make an update to your code
- Step 3 - Build the image
```console
cd section-04/blog/event-bus
docker build -t chesterheng/event-bus .
cd ../posts
docker build -t chesterheng/posts .
```
- Step 4 - Push the image to docker hub
```console
docker login
docker push chesterheng/event-bus
cd ../posts
docker push chesterheng/posts
```
[chesterheng/posts
](https://hub.docker.com/r/chesterheng/posts)
[chesterheng/event-bus
](https://hub.docker.com/r/chesterheng/event-bus)
- Step 5 - Run the command: kubectl rollout restart deployment [depl_name]
```console
kubectl get deployments
kubectl rollout restart deployment posts-depl
kubectl rollout restart deployment event-bus-depl
kubectl get deployments
kubectl get pods
kubectl logs posts-depl-6947b4f9c-t5zx5
```

**[⬆ back to top](#table-of-contents)**

### Verifying Communication

#1: Verifying Communication
```console
kubectl get pods
kubectl logs posts-depl-59f495469f-2zqmf
```

#2: Check if request can be send from posts pod to event-bus pod?
```console
kubectl get pods
kubectl exec -it posts-depl-59f495469f-2zqmf sh
/app # apk add curl
/app # curl http://event-bus-srv:4005/events
```

#3: Check if posts image is updated?
```console
kubectl get pods
kubectl exec -it posts-depl-6db458fb5c-q7khn -- cat index.js
```

**[⬆ back to top](#table-of-contents)**

### Adding Query, Moderation and Comments

Adding More Services

- For 'comments', 'query', 'moderation'....
```console
kubectl get services
```
- Update the URL's in each to reach out to the 'event-bus-srv'
- Build images + push them to docker hub
```console
cd section-04/blog/comments/
docker build -t chesterheng/comments .
docker push chesterheng/comments
```
```console
cd section-04/blog/moderation/
docker build -t chesterheng/moderation .
docker push chesterheng/moderation
```
```console
cd section-04/blog/query/
docker build -t chesterheng/query .
docker push chesterheng/query
```
- Create a deployment + clusterip service for each
```console
cd section-04/blog/infra/k8s/
kubectl apply -f .
kubectl get pods
kubectl describe pod comments-depl-5ffc5697c8-j9sq6
kubectl exec -it comments-depl-5ffc5697c8-j9sq6 -- cat index.js
kubectl get services
```
- Update the event-bus to once again send events to 'comments', 'query', and 'moderation'

**[⬆ back to top](#table-of-contents)**

### Testing Communication

Adding More Services

- For 'comments', 'query', 'moderation'....
- Update the URL's in each to reach out to the 'event-bus-srv'
- Build images + push them to docker hub
- Create a deployment + clusterip service for each
- Update the event-bus to once again send events to 'comments', 'query', and 'moderation'
```console
kubectl get services
cd section-04/blog/event-bus/
docker build -t chesterheng/event-bus .
docker push chesterheng/event-bus
kubectl rollout restart deployment event-bus-depl
kubectl get deployments
kubectl get pods
kubectl logs event-bus-depl-56f799cb77-f2h9v
kubectl describe pod event-bus-depl-56f799cb77-f2h9v
kubectl exec -it event-bus-depl-56f799cb77-f2h9v -- cat index.js
kubectl get services
```

**[⬆ back to top](#table-of-contents)**

### Load Balancer Services

![](section-04/react.jpg)
![](section-04/initial.jpg)
![](section-04/app.jpg)
![](section-04/option-1.jpg)
![](section-04/option-2.jpg)

**[⬆ back to top](#table-of-contents)**

### Load Balancers and Ingress

Load Balancer Service

- Tells Kubernetes to reach out to its provider and provision a load balancer.  Gets traffic in to a single pod

Ingress or Ingress Controller

- A pod with a set of routing rules to distribute traffic to other services

![](section-04/lb-1.jpg)
![](section-04/lb-2.jpg)

**[⬆ back to top](#table-of-contents)**

### Installing Ingress-Nginx

ingress-nginx
- Project that will create a Load Balancer Service + an Ingress for us
- We are using [ingress-nginx](https://github.com/kubernetes/ingress-nginx)
- There is another project that does the same thing with an almost identical name
  - [kubernetes-ingress](https://github.com/nginxinc/kubernetes-ingress)

[Installation Guide](https://kubernetes.github.io/ingress-nginx/deploy/)

```console
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.34.0/deploy/static/provider/cloud/deploy.yaml
```

**[⬆ back to top](#table-of-contents)**

### Writing Ingress Config Files

![](section-04/lb-2.jpg)

```console
cd section-04/blog/infra/k8s/
kubectl apply -f ingress-srv.yaml
```

**[⬆ back to top](#table-of-contents)**

### Hosts File Tweak

![](section-04/hosts.jpg)

| OS          | Host File Location                    |
| ----------- | ------------------------------------- |
| Windows     | C:\Windows\System32\Drivers\etc\hosts |
| MacOS/Linux | /etc/hosts                            |

```console
code /etc/hosts
```

- Add 127.0.0.1 posts.com to /etc/hosts
- Try http://posts.com/posts

**[⬆ back to top](#table-of-contents)**

### Quick Note

[React-Scripts v3.4.1 fails to start in Docker](https://github.com/facebook/create-react-app/issues/8688)

**[⬆ back to top](#table-of-contents)**

### Deploying the React App

```console
cd section-04/blog/client/
docker build -t chesterheng/client .
docker push chesterheng/client
cd ../infra/k8s/
kubectl apply -f client-depl.yaml
```

[Repositories](https://hub.docker.com/repositories)

**[⬆ back to top](#table-of-contents)**

### Unique Route Paths

![](section-04/request.jpg)

```console
cd section-04/blog/client/
docker build -t chesterheng/client .
docker push chesterheng/client
kubectl rollout restart deployment client-depl
cd ../posts/
docker build -t chesterheng/posts .
docker push chesterheng/posts
kubectl rollout restart deployment posts-depl
```

**[⬆ back to top](#table-of-contents)**

### Final Route Config

```console
cd section-04/blog/infra/k8s/
kubectl apply -f ingress-srv.yaml
kubectl get pod
```

**[⬆ back to top](#table-of-contents)**

### Introducing Skaffold

Skaffold

- Automates many tasks in a Kubernetes dev environment
- Makes it really easy to update code in a running pod
- Makes it really easy to create/delete all objects tied to a project at once
- [skaffold](skaffold.dev)

**[⬆ back to top](#table-of-contents)**

### Skaffold Setup

See blog/skaffold.yaml 

**[⬆ back to top](#table-of-contents)**

### First Time Skaffold Startup

```console
cd section-04/blog/
skaffold dev
```
**[⬆ back to top](#table-of-contents)**

### A Few Notes on Skaffold

- Restart skaffold if encounter error message
- kubectl will remove all kubernetes objects when exit

```console
kubectl get pod
kubectl get deployments
kubectl get services
```

**[⬆ back to top](#table-of-contents)**

## **Section 05: Architecture of Multi-Service Apps**

### Big Ticket Items

Lessons from App #1

- The big challenge in microservices is data
- Different ways to share data between services.  We are going to focus on async communication
- Async communication focuses on communicating changes using events sent to an event bus
- Async communication encourages each service to be 100% self-sufficient.  Relatively easy to handle temporary downtime or new service creation
- Docker makes it easier to package up services
- Kubernetes is a pain to setup, but makes it really easy to deploy + scale services

| Painful Things from App #1                                                                                        | Solutions!                                                                            |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Lots of duplicated code!                                                                                          | Build a central library as an NPM module to share code between our different projects |
| Really hard to picture the flow of events between services                                                        | Precisely define all of our events in this shared library.                            |
| Really hard to remember what properties an event should have                                                      | Write everything in Typescript.                                                       |
| Really hard to test some event flows                                                                              | Write tests for as much as possible/reasonable                                        |
| My machine is getting laggy running kubernetes and everything else...                                             | Run a k8s cluster in the cloud and develop on it almost as quickly as localz          |
| What if someone created a comment after editing 5 others after editing a post while balancing on a tight rope.... | Introduce a lot of code to handle concurrency issues                                  |

**[⬆ back to top](#table-of-contents)**

### Ticketing App Overview

- Users can list a ticket for an event (concert, sports) for sale
- Other users can purchase this ticket
- Any user can list tickets for sale and purchase tickets
- When a user attempts to purchase a ticket, the ticket is 'locked' for 15 minutes.  The user has 15 minutes to enter their payment info.
- While locked, no other user can purchase the ticket. After 15 minutes, the ticket should 'unlock'
- Ticket prices can be edited if they are not locked

![](section-05/app-1.jpg)
![](section-05/app-2.jpg)
![](section-05/app-3.jpg)

**[⬆ back to top](#table-of-contents)**

### Resource Types

![](section-05/resource-types.jpg)

**[⬆ back to top](#table-of-contents)**

### Service Types

![](section-05/service-types.jpg)

- We are creating a separate service to manage each type of resource
- Should we do this for every microservices app?
- Probably not? Depends on your use case, number of resources, business logic tied to each resource, etc
- Perhaps 'feature-based' design would be better

**[⬆ back to top](#table-of-contents)**

### Events and Architecture Design

![](section-05/events.jpg)
![](section-05/architecture-design.jpg)

**[⬆ back to top](#table-of-contents)**

### Auth Service Setup

![](section-05/auth.jpg)

**[⬆ back to top](#table-of-contents)**

### Auth K8s Setup

```console
cd sections-05/ticketing/auth/
docker build -t chesterheng/auth .
docker login
docker push chesterheng/auth
cd ../infra/k8s/
kubectl apply -f auth-depl.yaml
kubectl rollout restart deployment auth-depl
kubectl get deployment
kubectl get pod
kubectl logs auth-depl-7c7879db66-mwz79
kubectl describe pod auth-depl-7c7879db66-mwz79
kubectl exec -it auth-depl-7c7879db66-mwz79 -- cat index.js
kubectl get services
```

**[⬆ back to top](#table-of-contents)**

### Adding Skaffold

See ticketing/skaffold.yaml

```console
cd section-05/ticketing/
skaffold dev
```

**[⬆ back to top](#table-of-contents)**

### Ingress-Nginx Setup

```console
kubectl get ingress
kubectl describe ingress ingress-service
```

**[⬆ back to top](#table-of-contents)**

### Hosts File and Security Warning

Hosts File

- Open hosts file
```console
code /etc/hosts
```
- Add 127.0.0.1 ticketing.dev to hosts file

Security Warning

- Goto Chrome - https://ticketing.dev/api/users/currentuser
- Unskippable HTTPS warning in Chrome? 
  - type thisisunsafe

**[⬆ back to top](#table-of-contents)**

## **Section 06: Leveraging a Cloud Environment for Development**

### Note on Remote Development
**[⬆ back to top](#table-of-contents)**

### Remote Dev with Skaffold
**[⬆ back to top](#table-of-contents)**

### Google Cloud Initial Setup
**[⬆ back to top](#table-of-contents)**

### Kubernetes Cluster Creation
**[⬆ back to top](#table-of-contents)**

### Kubectl Contexts
**[⬆ back to top](#table-of-contents)**

### Initializing the GCloud SDK
**[⬆ back to top](#table-of-contents)**

### Installing the GCloud Context
**[⬆ back to top](#table-of-contents)**

### Updating the Skaffold Config
**[⬆ back to top](#table-of-contents)**

### More Skaffold Updates
**[⬆ back to top](#table-of-contents)**

### Creating a Load Balancer
**[⬆ back to top](#table-of-contents)**

### Final Config and Test
**[⬆ back to top](#table-of-contents)**

## **Section 07: Response Normalization Strategies**

### Creating Route Handlers

![](section-05/auth.jpg)

```typescript
// current-user.ts
import express from 'express';

const router = express.Router();
router.get('/api/users/currentuser', () => {});

export { router as currentUserRouter };
```

```typescript
// index.ts
import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';

const app = express();
app.use(json());
app.use(currentUserRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000!!!!!!!!');
});
```

**[⬆ back to top](#table-of-contents)**

### Scaffolding Routes

```typescript
// index.ts
import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
```

**[⬆ back to top](#table-of-contents)**

### Adding Validation

```typescript
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string') {
      res.status(400).send('Provide a valid email');
    }

    // new User({ email, password })
  }
);

export { router as signupRouter };
```

**[⬆ back to top](#table-of-contents)**

### Handling Validation Errors

![](section-07/error.jpg)

```typescript
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;
    console.log('Creating a user...')
    res.send({});
  }
);

export { router as signupRouter };
```

**[⬆ back to top](#table-of-contents)**

### Surprising Complexity Around Errors

![](section-07/express-validator.jpg)
![](section-07/different-frameworks.jpg)
![](section-07/react-different-errors.jpg)
![](section-07/handle-error-structure.jpg)

**[⬆ back to top](#table-of-contents)**

### Other Sources of Errors

![](section-07/scenarios.jpg)

**[⬆ back to top](#table-of-contents)**

### Solution for Error Handling

| Difficulty in Error Handling                                                                                                      | Solution                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| We must have a consistently structured response from all servers, no matter what went wrong                                       | Write an error handling middleware to process errors, give them a consistent structure, and send back to the browser |
| A billion things can go wrong, not just validation of inputs to a request handler.  Each of these need to be handled consistently | Make sure we capture all possible errors using Express's error handling mechanism (call the 'next' function!)        |

[Error Handling](https://expressjs.com/en/guide/error-handling.html)

**[⬆ back to top](#table-of-contents)**

### Building an Error Handling Middleware

```typescript
// error-handler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.log('Something went wrong', err);

  res.status(400).send({
    message: 'Something went wrong'
  });
};
```

**[⬆ back to top](#table-of-contents)**

### Communicating More Info to the Error Handler
**[⬆ back to top](#table-of-contents)**

### Encoding More Information In an Error

![](section-07/error-object.jpg)
![](section-07/error-object-2.jpg)

**[⬆ back to top](#table-of-contents)**

### Subclassing for Custom Errors
**[⬆ back to top](#table-of-contents)**

### Determining Error Type
**[⬆ back to top](#table-of-contents)**

### Converting Errors to Responses
**[⬆ back to top](#table-of-contents)**

### Moving Logic Into Errors
**[⬆ back to top](#table-of-contents)**

### Verifying Our Custom Errors
**[⬆ back to top](#table-of-contents)**

### Final Error Related Code
**[⬆ back to top](#table-of-contents)**

### How to Define New Custom Errors
**[⬆ back to top](#table-of-contents)**

### Uh Oh... Async Error Handling
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
