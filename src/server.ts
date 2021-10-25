/* eslint-disable @typescript-eslint/no-floating-promises */
import 'express-async-errors';

import env from './config/env';
import logger from './config/logger';

import app from './config/app';
import { MongoHelper } from './infra/db';

export default async (): Promise<void> => {
  try {
    console.log(env.mongodbUri);

    await MongoHelper.connect(env.mongodbUri);
    await MongoHelper.createConstraints();

    if (process.env.NODE_ENV !== 'test') {
      const collection = await MongoHelper.getCollection('user');
      await collection.deleteMany({ email: 'admin@gaivota.ai' });
      await collection.insertOne({
        name: 'Admin',
        email: 'admin@admin.dev',
        password: 'admin',
      });
    }

    app.listen(env.port, () => logger.info(`Server running ${env.port}`));
  } catch (err) {
    logger.error(err);
  }
};
