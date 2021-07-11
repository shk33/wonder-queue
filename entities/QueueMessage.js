'use strict';

const VISIBLE_STATUS = 'VISIBLE';
const PROCESSING_STATUS = 'PROCESSING';

class QueueMessage {
  constructor(message) {
    this.status = PROCESSING_STATUS;
    this.message = message;
  }

  getMessage() {
    return this.message;
  }

  getStatus() {
    return this.status;
  }
}

module.exports = QueueMessage;