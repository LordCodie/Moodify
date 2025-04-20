import { defaults } from 'jest-config'

/** @type {import('jest').Config} */
const config = {
  setupFiles: ["<rootDir>/tests/jest.setup.js"],
  testEnvironment: "node",
  testTimeout: 30000,
};

export default config;
