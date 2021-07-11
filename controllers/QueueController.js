'use strict';
const QueueService = require('../services/QueueService');

class QueueController {
  static getAvailableMessageList(req, res, next) {
    const messages = QueueService.getAvailableMessages();
    res.json(messages);
  }

  static publishMessageToQueue(req, res, next) {
    const messages = QueueService.getAvailableMessages();
    res.json(messages);
  }
}

module.exports = QueueController;