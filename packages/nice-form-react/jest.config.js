const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  roots: [path.resolve(__dirname, './tests')],
  coverageReporters: ['lcov', 'text', 'cobertura'],
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  testMatch: ['**/tests/**/*.test.tsx'],
  setupFilesAfterEnv: [path.resolve(__dirname, './tests/setupAfterEnv.ts')],
  testTimeout: 10000,
  clearMocks: false,
  transform: {
    '.(js|jsx)': 'babel-jest',
    '.(ts|tsx)': 'ts-jest',
  },
  transformIgnorePatterns: [`/node_modules/`, '/tests/*.{ts,tsx}'],
};
