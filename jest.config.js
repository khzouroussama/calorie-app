module.exports = {
  projects: [
    '<rootDir>/packages/*/jest.config.js', // Adjust this path if your workspaces are located elsewhere
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
