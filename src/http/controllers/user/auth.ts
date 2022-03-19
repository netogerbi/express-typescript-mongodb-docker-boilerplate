import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { authenticate } from '../../../domain/v1/user/service';
import { RequestValidationError } from '../../../utils/errors/request-validation-error';

export const authController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await check('email', 'Email is not valid').isEmail().run(req);

  await check('password', 'Message cannot be blank').not().isEmpty().run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = req.body;

  const auth = await authenticate({ email, password });

  return res.send(auth);
};
