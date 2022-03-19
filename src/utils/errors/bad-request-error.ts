import { CommonErrorStructure, CustomError } from './interfaces/common-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): CommonErrorStructure[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
