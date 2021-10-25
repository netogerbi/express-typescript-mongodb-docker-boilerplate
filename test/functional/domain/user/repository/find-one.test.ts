import { MongoHelper } from '../../../../../src/infra/db';
import { findOne } from '../../../../../src/domain/v1/user/repository';

describe('UserRepository.findOne', () => {
  const u = {
    email: 'admin@admin.com',
    password: 'admin',
  };

  beforeEach(async () => {
    // MongoHelper.connect(env.mongodbUri);
    const col = await MongoHelper.getCollection('user');
    await col.insertOne({ ...u, name: 'Admin' });
  });

  afterEach(async () => {
    const col = await MongoHelper.getCollection('user');
    col.deleteMany({});
  });

  it('should find user', async () => {
    const r = await findOne(u);

    expect(r?.email).toMatch(/admin@admin.com/);
    expect(r?.password).toMatch(/admin/);
    expect(r?.name).toMatch(/Admin/);
  });
});
