import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const validateId = async (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): Promise<Response | void> => {
  await check('id', 'id is not valid.')
    .isString()
    .isLength({ min: 3 })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }

  return next();
};
