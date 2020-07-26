import { Publisher, OrderCreatedEvent, Subjects } from '@chticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
