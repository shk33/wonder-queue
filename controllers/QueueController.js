'use strict';
const QueueService = require('../services/QueueService');
const CannotFinishMessageError = require('../errors/CannotFinishMessageError');
const NotFoundError = require('../errors/NotFoundError');

class QueueController {
  static getMessageList(req, res, next) {
    const messages = QueueService.getMessageList();
    return res.json(messages);
  }

  static pollMessages(req, res, next) {
    const messages = QueueService.pollMesageList();
    return res.json(messages);
  }

  static publishMessageToQueue(req, res, next) {
    const { message } = req.body;
    if(!message) {
      return res.status(400).send({ error: 'A message is required' })
    }
    const createdMessage = QueueService.publishMessage(message);
    return res.json(createdMessage);
  }

  static markMessageAsFinished(req, res, next) {
    const { messageId } = req.params;
    if(!messageId) {
      return res.status(400).send({ error: 'A message id is required' })
    }
    try {
      QueueService.finishMessageById(messageId);
      res.json({ sucess: true, message: `Message ID ${messageId} finished. Removed from queue`});
    } catch (error) {
      const { message: errorMessage } = error;
      if (error instanceof NotFoundError) {
        return res.status(404).send({ error: errorMessage })
      }

      if(error instanceof CannotFinishMessageError) {
        return res.status(422).send({ error: errorMessage })
      }

      return res.status(422).send({ error: errorMessage })
    }
  }
}

module.exports = QueueController;