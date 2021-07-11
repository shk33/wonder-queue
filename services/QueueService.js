'use strict';
const QueueMessage = require('../entities/QueueMessage');
const { VISIBLE_STATUS } = require('../entities/QueueMessageStatus');

const messages = [];

class QueueService {
  static getMessageList() {
    return messages.map(m => m.getPublicVersion());
  }

  static pollMesageList() {
    const availableMessages = messages.filter(m => m.status === VISIBLE_STATUS);
    availableMessages.forEach(m => m.markAsProcessing());
    return availableMessages.map(m => m.getPublicVersion());
  }

  static publishMessage(messageString) {
    const newMessage = new QueueMessage(messageString);
    messages.push(newMessage);
    return newMessage.getPublicVersion();
  }
}

module.exports = QueueService;