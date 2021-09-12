import 'source-map-support/register';

import AWS from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { middyfy } from '../../libs/lambda';
import { AWS_REGION, S3_BUCKET_FOLDER_UPLOAD } from '../../common/constants';
import { formatJSONResponse } from '../../libs/apiGateway';

const importProductsFile = async (event: APIGatewayEvent) => {
  console.log('GET IMPORT/ EVENT OBJECT: ', event);

  try {
    const s3 = new AWS.S3({ region: AWS_REGION });

    const name = event.queryStringParameters.name;

    const s3Path = `${S3_BUCKET_FOLDER_UPLOAD}/${name}`;

    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: s3Path,
      Expires: 60,
      ContentType: 'text/csv',
    };

    const url = await s3.getSignedUrlPromise('putObject', s3Params);

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
