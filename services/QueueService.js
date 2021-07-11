'use strict';
const QueueMessage = require('../entities/QueueMessage');
const { VISIBLE_STATUS, PROCESSING_STATUS } = require('../entities/QueueMessageStatus');
const CannotFinishMessageError = require('../errors/CannotFinishMessageError');
const NotFoundError = require('../errors/NotFoundError');

let messages = [];

class QueueService {
  static getMessageList() {
    return messages.map(m => m.getPublicVersion());
  }

  static cleanMessageList() {
    messages.forEach(m => m.finish());
    messages = [];
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

  static finishMessageById(messageId) {
    const message = messages.find(m => m.id === messageId);

    if(!message){
      throw new NotFoundError(`Message ID ${messageId} not FOUND`);
    }
    if(message.status !== PROCESSING_STATUS) {
      throw new CannotFinishMessageError(`Message ID ${messageId} cannot be Finished. It is not in Processing status`);
    }

    message.finish();
    // Removes Message from Queue
    messages = messages.filter(m => m.id !== messageId);
  }
}

module.exports = QueueService;