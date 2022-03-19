/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';
import { MongoHelper } from '../../../../../src/infra/db';
import env from '../../../../../src/config/env';
import { authenticate } from '../../../../../src/domain/v1/user/service';
import { Collection } from 'mongodb';
import { CustomError } from '../../../../../src/utils/errors/interfaces/common-error';

describe('UserService.autheticate', () => {
  let col: Collection;

  beforeEach(async () => {
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

  it('should autheticate user', async () => {
    const r = await authenticate({ email: 'test@test.com', password: 'test' });
    const ver = jwt.verify(r.token.substring('Bearer '.length), env.jwtSecret);

    expect(ver).not.toBeNull();
  });

  it('should return null with user not found', async () => {
    col.deleteMany({});

    let r: CustomError | undefined;
    try {
      await authenticate({ email: 'test@test.com', password: 'test' });
    } catch (err) {
      r = err as CustomError;
    }

    console.log(r);

    expect(r!.message).toMatch(/Unauthorized/gi);
    expect(r!.statusCode).toBe(401);
  });
});
