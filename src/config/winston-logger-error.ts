import { Express } from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

export default (app: Express): void => {
  app.use(
    expressWinston.errorLogger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
    })
  );
};
