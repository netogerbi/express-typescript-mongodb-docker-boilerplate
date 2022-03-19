import env from './config/env';
import logger from './config/logger';

import app from './config/app';
import { MongoHelper } from './infra/db';

export default async (): Promise<void> => {
  try {
    await MongoHelper.connect(env.mongodbUri);
    await MongoHelper.createConstraints();

    if (!['test', 'production'].includes(process.env.NODE_ENV ?? '')) {
      const collection = await MongoHelper.getCollection('user');
      await collection.deleteMany({ email: 'admin@gaivota.ai' });
      await collection.insertOne({
        name: 'Admin',
        email: 'admin@admin.dev',
        password: 'admin',
      });
    }

    app.listen(env.port, () =>
      logger.info(`Server running on port ${env.port}`)
    );
  } catch (err) {
    logger.error(err);
  }
};
