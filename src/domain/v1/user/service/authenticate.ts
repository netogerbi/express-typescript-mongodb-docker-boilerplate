import env from '../../../../config/env';
import { AuthToken, UserLoginDTO } from '../dto';
import { findOne } from '../repository';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../../../../utils/errors/not-authorized-error';

/**
 * authenticate user
 * @param u user login data
 * @returns token
 */
export const authenticate = async (
  userLogin: UserLoginDTO
): Promise<AuthToken> => {
  const userFound = await findOne(userLogin);

  if (!userFound) throw new NotAuthorizedError();

  const token = jwt.sign(userFound, env.jwtSecret);
  return { token: 'Bearer ' + token };
};
