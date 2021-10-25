/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, Collection } from 'mongodb';
import logger from '../../../config/logger';
import { AppError } from '../../../utils';

export type COLLECTIONS = 'user';

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  },

  async createConstraints() {
    if (!this.client)
      throw new AppError('Missing mongo conection to create constraints');

    await this.getCollection('user')
      .then(
        async col =>
          await col.createIndex({ '$**': 'text' }, { name: 'TextIndex' })
      )
      .catch(err => logger.error(err));
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    // eslint-disable-next-line prettier/prettier
    this.client = null as unknown as MongoClient;
  },

  async getCollection(name: COLLECTIONS): Promise<Collection> {
    if (!this.client) await this.connect(this.uri);
    return this.client.db().collection(name);
  },

  map: <T>(data: any): T => {
    const { _id, ...rest } = data;
    return { ...rest, id: _id };
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c));
  },
};
