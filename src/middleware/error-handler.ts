import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { CustomError } from '../utils/errors/interfaces/common-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  logger.error(err);

  if (err instanceof CustomError) {
    const serializedErr = err.serializeErrors();

    return res.status(err.statusCode).send({
      message: serializedErr,
    });
  }

  return res.status(500).send({
    message: err.message,
  });
};
