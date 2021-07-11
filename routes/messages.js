const express = require('express');
const router = express.Router();
const QueueController = require('../controllers/QueueController');

/* GET All Messages. */
router.get('/', QueueController.getMessageList);

/* GET Poll Messages. */
router.get('/poll', QueueController.pollMessages);

/* POST Publish a message to Queue */
router.post('/', QueueController.publishMessageToQueue);

module.exports = router;