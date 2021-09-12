import type { AWS } from '@serverless/typescript';

import { AWS_REGION } from './src/common/constants';
import importProductsFile from './src/functions/importProductsFile';

const serverlessConfiguration: AWS = {
  service: 'import-service',
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
      S3_BUCKET: '${env:S3_BUCKET}',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: 'arn:aws:s3:::${env:S3_BUCKET}/*',
      },
    ],
  },
  // import the function via paths
  functions: { importProductsFile },
};

module.exports = serverlessConfiguration;
