import { Express, Request, Response } from 'express';
import { authController } from '../http/controllers/user/auth';
import { authenticatedMiddleware } from '../middleware';
import v1Routes from '../http/routes/v1/v1-routes';

export default (app: Express): void => {
  app.get('/', async (_: Request, res: Response) => {
    return res.status(200).json({ message: 'Gaivota Test' });
  });

  app.use('/login', authController);
  app.use(authenticatedMiddleware);
  app.use('/v1', v1Routes);
};
