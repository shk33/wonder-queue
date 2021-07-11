const express = require('express');
const router = express.Router();
const QueueController = require('../controllers/QueueController');

/* GET All Messages. */
router.get('/', QueueController.getMessageList);

/* GET Poll Messages (returns Available Messages) */
router.get('/poll', QueueController.pollMessages);

/* POST Publish a message to Queue */
router.post('/', QueueController.publishMessageToQueue);

/* PUT Mark Message as Finised */
router.put('/:messageId', QueueController.markMessageAsFinished);

module.exports = router;