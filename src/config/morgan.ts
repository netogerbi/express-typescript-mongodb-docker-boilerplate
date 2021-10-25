import { Express } from 'express';
import morgan from 'morgan';

export default (app: Express): void => {
  app.use(
    morgan(
      '"IP :remote-addr" - ":method :url" "STATUS :status" ":referrer" :response-time ms',
      {
        skip: () => process.env.NODE_ENV === 'test',
      }
    )
  );
};
