import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@chticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
