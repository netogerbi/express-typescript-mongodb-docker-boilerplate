/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';
import { CustomError } from '../../../../../src/utils/errors/interfaces/common-error';
import env from '../../../../../src/config/env';
import { isAuthenticated } from '../../../../../src/domain/v1/user/service';

describe('UserService.autheticate', () => {
  let token: string;
  beforeEach(async () => {
    token = jwt.sign(
      { email: 'test@test.com', password: 'pass', name: 'Admin' },
      env.jwtSecret
    );
  });

  it('should return true with user autheticated', async () => {
    const r = isAuthenticated({ token: 'Bearer ' + token });

    expect(r.name).toMatch(/Admin/);
    expect(r.password).toMatch(/pass/);
    expect(r.email).toMatch(/test@test.com/);
  });

  it('should return true with user autheticated', async () => {
    token = jwt.sign(
      { email: 'test@test.com', password: 'pass', name: 'Admin' },
      'test'
    );

    let r: CustomError;
    try {
      isAuthenticated({ token: 'Bearer ' + token });
    } catch (err) {
      r = err as CustomError;
    }

    expect(r!.message).toMatch(/Unauthorized/i);
    expect(r!.statusCode).toBe(401);
  });
});
