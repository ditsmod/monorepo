import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  projects: [ '<rootDir>/apps/*/jest.config.ts']
};

export default config;