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
      displayName: 'spotify',
      testMatch: ['<rootDir>/tests/spotify-test/**/*.test.js'],
      setupFiles: ['<rootDir>/tests/spotify-test/jest.setup.js'],
      testEnvironment: "node",
      testTimeout: 30000,
    }
  ]
}

export default config;
