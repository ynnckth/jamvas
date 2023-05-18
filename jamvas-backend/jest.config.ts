import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  coverageReporters: ['lcov'],
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage.*/', '/dist/'],
  coverageProvider: 'v8',
  testResultsProcessor: 'jest-sonar-reporter',
};

export default config;
