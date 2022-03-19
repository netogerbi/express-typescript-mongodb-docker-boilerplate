import { CommonErrorStructure, CustomError } from './interfaces/common-error';
import { ValidationError } from 'express-validator';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(private readonly errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): CommonErrorStructure[] {
    return this.errors.map(e => ({ message: e.msg, field: e.param }));
  }
}
