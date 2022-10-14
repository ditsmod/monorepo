module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '@dict/assert': '<rootDir>/src/app/modules/service/validation/locales/current/_base-uk/assert.dict.ts',
    '@shared': '<rootDir>/../shared/src',
    '@classes/(.+)': '<rootDir>/src/app/classes/$1',
    '@models/(.+)': '<rootDir>/src/app/models/$1',
    '@service/(.+)': '<rootDir>/src/app/modules/service/$1',
    '@routed/(.+)': '<rootDir>/src/app/modules/routed/$1',
    '@params': '<rootDir>/src/app/models/params',
  },
};
