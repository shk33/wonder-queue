const express = require('express');
const router = express.Router();
const QueueController = require('../controllers/QueueController');

/* GET Available Messages. */
router.get('/', QueueController.getAvailableMessageList);

/* POST Publish a message to Queue */
router.post('/', QueueController.getAvailableMessageList);

module.exports = router;