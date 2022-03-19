import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../utils/errors/not-authorized-error';
import { isAuthenticated } from '../domain/v1/user/service';

export const authenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.header('Authorization');

  if (!token) {
    throw new NotAuthorizedError();
  }

  req.user = isAuthenticated({ token });
  return next();
};
