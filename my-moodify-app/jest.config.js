import { defaults } from 'jest-config'

/** @type {import('jest').Config} */
const config = {
  projects: [
    {
      displayName: 'firebase',
      testMatch: ["<rootDir>/tests/firebase-test/**/*.test.js"], 
      setupFiles: ["<rootDir>/tests/firebase-test/jest.setup.js"],
      testEnvironment: "node",
      testTimeout: 30000,
    },
    {
      displayName: 'api-response',
      testMatch: ['<rootDir>/tests/api-response-test/**/*.test.js'],
      setupFiles: ['<rootDir>/tests/api-response-test/jest.setup.js'],
      testEnvironment: "node",
      testTimeout: 30000,
    },
    {
      displayName: 'sentiment',
      testMatch: ['<rootDir>/tests/mood-algo-test/**/*.test.js'],
      setupFiles: ['<rootDir>/tests/mood-algo-test/jest.setup.js'],
      testEnvironment: "node",
      testTimeout: 30000,
    },
    {
      displayName: 'user-test',
      testMatch: ['<rootDir>/tests/user-test/**/*.test.js'],
      setupFiles: ['<rootDir>/tests/user-test/jest.setup.js'],
      testEnvironment: "jsdom",
    }
  ]
}

export default config;
