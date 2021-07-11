'use strict';
const { v4: uuidv4 } = require('uuid');

const VISIBLE_STATUS = 'VISIBLE';
const PROCESSING_STATUS = 'PROCESSING';

class QueueMessage {
  constructor(message) {
    this.status = VISIBLE_STATUS;
    this.message = message;
    this.id = uuidv4();
  }

  getPublicVersion() {
      return {
        status: this.status,
        message: this.message,
        id: this.id
      }
  }
}

module.exports = QueueMessage;