import { MongoHelper } from '../../../../infra/db';
import { UserLoginDTO } from '../dto';
import { User } from '../model';

export const findOne = async (
  userLogin: UserLoginDTO
): Promise<User | null> => {
  const collection = await MongoHelper.getCollection('user');
  const userFound = await collection.findOne(userLogin);
  if (!userFound) return null;
  return MongoHelper.map<User>(userFound);
};
