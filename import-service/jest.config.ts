import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  silent: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
};

export default config;
