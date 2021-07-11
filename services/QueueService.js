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
    return newMessage.getPublicVersion();
  }
}

module.exports = QueueService;