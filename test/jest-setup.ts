import supertest from 'supertest';
import app from '../src/config/app';
import { MongoHelper } from '../src/infra/db';
import env from '../src/config/env';

jest.setTimeout(60000);

beforeAll(async () => {
  await MongoHelper.connect(env.mongodbUri);
  global.testRequest = supertest(app);
});
