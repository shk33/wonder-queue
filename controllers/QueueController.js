'use strict';
const QueueService = require('../services/QueueService');

class QueueController {
  static getAvailableMessageList(req, res, next) {
    const messages = QueueService.getAvailableMessages();
    res.json(messages);
  }

  static publishMessageToQueue(req, res, next) {
    const { message } = req.body;
    if(!message) {
      res.status(400).send({ error: 'A message is required' })
    }
    const createdMessage = QueueService.publishMessage(message);
    res.json(createdMessage);
  }
}

module.exports = QueueController;