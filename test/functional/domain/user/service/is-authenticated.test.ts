/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';
import { AppError } from 'src/utils';
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

    let r: AppError;
    try {
      isAuthenticated({ token: 'Bearer ' + token });
    } catch (err) {
      r = err as AppError;
    }

    expect(r!.message).toMatch(/Unauthorized/i);
    expect(r!.status).toBe(401);
  });
});
