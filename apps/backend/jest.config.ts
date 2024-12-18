import type { Config } from 'jest';
import * as path from 'node:path';
import * as dotenv from 'dotenv';

const dotenvPath = path.resolve(`${__dirname}/.env`);
const output = dotenv.config({ path: dotenvPath });
if (output.error) {
  throw output.error;
}

const config: Config = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/src/', '<rootDir>/e2e/'],
};

export default config;
