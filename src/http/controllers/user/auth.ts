import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { authenticate } from '../../../domain/v1/user/service';
import logger from '../../../config/logger';
import { AppError } from 'src/utils';

export const authController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await check('email', 'Email is not valid').isEmail().run(req);

    await check('password', 'Message cannot be blank').not().isEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    }

    const { email, password } = req.body;

    const auth = await authenticate({ email, password });

    return res.send(auth);
  } catch (err) {
    logger.error(err);
    const error = err as AppError;
    return res.status(error.status || 500).send(error.message);
  }
};
