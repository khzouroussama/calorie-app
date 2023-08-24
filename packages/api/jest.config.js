const base = require('../../jest.config');

module.exports = {
  displayName: '@calorie-app/api',
  roots: ['<rootDir>/src/'], // or wherever your source files are
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@calorie-app/db': '<rootDir>/../db/src',
    '^@calorie-app/http': '<rootDir>/../http/src',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json', // path to your tsconfig.json
    },
  },
};
