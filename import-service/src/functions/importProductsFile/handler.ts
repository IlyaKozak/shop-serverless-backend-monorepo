import 'source-map-support/register';

import AWS from 'aws-sdk';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { AWS_REGION, BUCKER_FOLDER } from 'src/common/constants';

const s3 = new AWS.S3({ region: AWS_REGION });

const importProductsFile = async (event) => {
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

    return formatJSONResponse({
      url,
    });
  } catch (error) {
    return formatJSONResponse({
      error,
    });
  }
}

export const main = middyfy(importProductsFile);
