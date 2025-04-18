const {defaults} = require('jest-config');

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "node",
  testTimeout: 30000
};

module.exports = config;
