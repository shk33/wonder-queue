'use strict';
const QueueMessage = require('../entities/QueueMessage');

const messages = [];

class QueueService {
  static getAvailableMessages() {
    return messages;
  }

  static publishMessage(messageString) {
    const newMessage = new QueueMessage(messageString);
    messages.push(newMessage);
  }
}

module.exports = QueueService;