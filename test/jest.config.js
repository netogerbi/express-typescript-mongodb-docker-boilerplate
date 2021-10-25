const path = require('path');

const root = path.resolve(__dirname, '..');
const rootConfig = require(`${root}/jest.config.js`);

require('dotenv').config({
  path: `${root}/.env.test`,
});

module.exports = {
  ...rootConfig,
  rootDir: root,
  displayName: 'TESTS::',
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
};
