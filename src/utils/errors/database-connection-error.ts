import { CommonErrorStructure, CustomError } from './interfaces/common-error';

export class DatabaseConnectionError extends CustomError {
  message = 'Could not connect to database';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): CommonErrorStructure[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
