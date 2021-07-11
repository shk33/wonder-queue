const assert = require('assert');
const QueueService = require('../../services/QueueService');
const { VISIBLE_STATUS, PROCESSING_STATUS } = require('../../entities/QueueMessageStatus');

describe('QueueService', () => {
  beforeEach((done) => {
    QueueService.cleanMessageList();
    done();
  });

  it('should have zero messages when it starts', () => {
    assert.equal(QueueService.getMessageList().length, 0);
  });

  it('should create a message in visible status and add it to queue', () => {
    const messageTitle = 'Test 1';
    const message = QueueService.publishMessage(messageTitle);

    assert.equal(QueueService.getMessageList().length, 1);
    assert.equal(message.status, VISIBLE_STATUS);
  });

  it('should poll a message and change it status to processing ', () => {
    const messageTitle = 'Test 1';
    const message = QueueService.publishMessage(messageTitle);

    assert.equal(QueueService.getMessageList().length, 1);
    assert.equal(message.status, VISIBLE_STATUS);

    const polledMessages = QueueService.pollMesageList();
    assert.equal(polledMessages.length, 1);
    assert.equal(polledMessages[0].status, PROCESSING_STATUS);

    // To clean any pending timeouts
    QueueService.cleanMessageList();
  });

  it('should mark a message as finished and removed from queue ', () => {
    const messageTitle = 'Test 1';
    const message = QueueService.publishMessage(messageTitle);

    assert.equal(QueueService.getMessageList().length, 1);
    assert.equal(message.status, VISIBLE_STATUS);

    const polledMessages = QueueService.pollMesageList();
    const firstMessage = polledMessages[0];
    assert.equal(polledMessages.length, 1);
    assert.equal(firstMessage.status, PROCESSING_STATUS);

    QueueService.finishMessageById(firstMessage.id);
    assert.equal(QueueService.getMessageList().length, 0);
  });
});