import { NextFunction, Request, Response } from 'express';
import { AppError } from 'src/utils';
import logger from '../config/logger';
import { isAuthenticated } from '../domain/v1/user/service';

export const authenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.user = isAuthenticated({ token });
    return next();
  } catch (error) {
    logger.error(error);
    const err = error as AppError;
    return res.status(err.status || 500).send(err.message);
  }
};
