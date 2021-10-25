import { Express } from 'express';
import cors from 'cors';

export default (app: Express): void => {
  app.use(cors());
};
