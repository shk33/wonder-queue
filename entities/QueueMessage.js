'use strict';
const { v4: uuidv4 } = require('uuid');
const { VISIBLE_STATUS, PROCESSING_STATUS } = require('./QueueMessageStatus');
const VISIBILITY_TIMEOUT_MILISECONDS = process.env.VISIBILITY_TIMEOUT || 15000;
class QueueMessage {
  constructor(message) {
    this.status = VISIBLE_STATUS;
    this.message = message;
    this.id = uuidv4();
    this.timeoutVisibilityFn = null;
  }

  markAsProcessing() {
    this.status = PROCESSING_STATUS;
    this.startVisibilityTimeout();
  }

  finish() {
    if(this.timeoutVisibilityFn){
      clearTimeout(this.timeoutVisibilityFn);
    }
  }

  startVisibilityTimeout() {
    this.timeoutVisibilityFn = setTimeout(
      () => {
          this.status = VISIBLE_STATUS;
          this.timeoutVisibilityFn = null;
          console.log(`Timeout Mesage ID: ${this.id} will be visible again`); 
      }
      , VISIBILITY_TIMEOUT_MILISECONDS
    );
  }

  getPublicVersion() {
    return {
      id: this.id,
      message: this.message,
      status: this.status,
    }
  }
}

module.exports = QueueMessage;