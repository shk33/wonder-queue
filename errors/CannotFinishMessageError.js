class CannotFinishMessageError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CannotFinishMessageError';
  }
}

module.exports = CannotFinishMessageError;