import { MongoHelper } from '../../../src/infra/db';
import { Collection } from 'mongodb';

describe('User.loginController', () => {
  let col: Collection;

  beforeEach(async () => {
    // MongoHelper.connect(env.mongodbUri);
    col = await MongoHelper.getCollection('user');
    await col.insertOne({
      email: 'test@test.com',
      password: 'test',
      name: 'Test',
    });
  });

  afterEach(async () => {
    col.deleteMany({});
  });

  it('should login and return 200', async () => {
    const r = await global.testRequest.post('/login').send({
      email: 'test@test.com',
      password: 'test',
    });

    expect(r.status).toBe(200);
    expect(r.body.token).toMatch(/(Bearer ).*/);
  });

  it('should not login and return 401', async () => {
    const r = await global.testRequest.post('/login').send({
      email: 'x@test.com',
      password: 'x',
    });

    expect(r.status).toBe(401);
  });

  it('should return validation errors and status 422', async () => {
    const r = await global.testRequest.post('/login').send({
      email: 'test.com',
      password: '',
    });

    expect(r.status).toBe(422);
    expect(r.body).toEqual([
      {
        value: 'test.com',
        msg: 'Email is not valid',
        param: 'email',
        location: 'body',
      },
      {
        value: '',
        msg: 'Message cannot be blank',
        param: 'password',
        location: 'body',
      },
    ]);
  });
});
