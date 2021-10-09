import type { AWS } from '@serverless/typescript';
import dotenv from 'dotenv';
dotenv.config();
const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;

import { 
  getProductsList,
  getProductById,
  createProduct,
  catalogBatchProcess,
} from './src/functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service',
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
    region: 'eu-west-1',
    stage: '${opt:stage, "dev"}',
    apiGateway: {
      minimumCompressionSize: 256,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      STAGE: '${opt:stage, "dev"}',
      PGHOST,
      PGUSER,
      PGDATABASE,
      PGPASSWORD,
      PGPORT,
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { 
    getProductsList, 
    getProductById, 
    createProduct,
    catalogBatchProcess,
  },
  variablesResolutionMode: '20210326',
};

module.exports = serverlessConfiguration;
