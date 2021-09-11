import 'source-map-support/register';

import AWS from 'aws-sdk';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { middyfy } from '@libs/lambda';
import { AWS_REGION, BUCKER_FOLDER } from 'src/common/constants';
import { formatJSONResponse } from '@libs/apiGateway';

const s3 = new AWS.S3({ region: AWS_REGION });

const importProductsFile = async (event) => {
  console.log('GET IMPORT/ EVENT OBJECT: ', event);

  try {
    const name = event.queryStringParameters.name;

    const path = `${BUCKER_FOLDER}/${name}`;

    const params = {
      Bucket: 'import-service-serverless',
      Key: path,
      Expires: 60,
      ContentType: 'text/csv',
    };

    const url = await s3.getSignedUrlPromise('putObject', params);

    return formatJSONResponse(url);
  } catch (error) {
    console.error('[ERROR] GET IMPORT/ ERROR: ', error);

    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR, 
      ReasonPhrases.INTERNAL_SERVER_ERROR, 
      { expose: true }
    );
  }
}

export const main = middyfy(importProductsFile);
