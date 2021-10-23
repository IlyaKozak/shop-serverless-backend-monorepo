import type { AWS } from '@serverless/typescript';

import dotenv from 'dotenv';
dotenv.config();
const {
  GITHUB,
  PASSWORD,
} = process.env;

import basicAuthorizer from './src/functions/basicAuthorizer';

import { AWS_REGION } from './src/common/constants';

const serverlessConfiguration: AWS = {
  service: 'authorization-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.ts',
      includeModules: true,
    },
  },
  package: {
    individually: true,
  },
  plugins: ['serverless-webpack'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: AWS_REGION,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      [GITHUB]: PASSWORD,
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { basicAuthorizer },
  resources: {
    Outputs: {
      BasicAuthorizerLambdaFunctionQualifiedArn: {
        Export: {
          Name: 'basicAuthorizerQualifiedArn',
        }
      },
    },
  },
};

module.exports = serverlessConfiguration;
