'use strict';
const QueueService = require('../services/QueueService');

class QueueController {
  static getMessageList(req, res, next) {
    const messages = QueueService.getMessageList();
    res.json(messages);
  }

  static pollMessages(req, res, next) {
    const messages = QueueService.pollMesageList();
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