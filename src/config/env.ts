import path from 'path';
import dotenv from 'dotenv';

const nodeEnv = `${process.env.NODE_ENV}`;

const getEnv = {
  test: path.resolve(__dirname, '..', '..', '.env-test'),
  development: path.resolve(__dirname, '..', '..', '.env'),
};

const getEnvs = getEnv[nodeEnv];

dotenv.config({ path: getEnvs });

export default {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT ? process.env.PORT : 5000,
  mongodbUri: process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost/todo',
  jwtSecret: process.env.JWT_PW ? process.env.JWT_PW : 'todo',
};
