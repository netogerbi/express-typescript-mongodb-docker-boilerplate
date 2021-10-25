import app from 'src/config/app';
import supertest, { SuperTest, Test } from 'supertest';

export default (): SuperTest<Test> => supertest(app);
