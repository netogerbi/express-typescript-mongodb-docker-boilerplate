export class AppError extends Error {
  constructor(public readonly message: string, public readonly status = 500) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
