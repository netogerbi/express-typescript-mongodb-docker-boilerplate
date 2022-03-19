import env from '../../../../config/env';
import { AuthToken } from '../dto';
import jwt from 'jsonwebtoken';
import logger from '../../../../config/logger';
import { User } from '../model';
import { NotAuthorizedError } from '../../../../utils/errors/not-authorized-error';

export const isAuthenticated = ({ token }: AuthToken): User => {
  const t = token.substr('Bearer '.length);
  try {
    const v = jwt.verify(t, env.jwtSecret);
    return v as User;
  } catch (err) {
    logger.error(err);
    throw new NotAuthorizedError();
  }
};
