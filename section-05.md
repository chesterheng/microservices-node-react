## **Section 05: Architecture of Multi-Service Apps**

## Table of Contents
- [**Section 05: Architecture of Multi-Service Apps**](#section-05-architecture-of-multi-service-apps)
- [Table of Contents](#table-of-contents)
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