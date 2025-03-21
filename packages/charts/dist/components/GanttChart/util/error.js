export class IllegalConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IllegalConnectionError';
  }
}
export class InvalidDiscreteLabelError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidDiscreteLabelError';
  }
}
