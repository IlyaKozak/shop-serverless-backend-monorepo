import 'source-map-support/register';

import AWS from 'aws-sdk';
import { S3Event } from 'aws-lambda';
import csv from 'csv-parser';

import { middyfy } from '../../libs/lambda';
import { 
  AWS_REGION,
  S3_BUCKET_FOLDER_UPLOAD,
  S3_BUCKET_FOLDER_PARSE,
} from '../../common/constants';

const Bucket = process.env.S3_BUCKET;

const s3 = new AWS.S3({ region: AWS_REGION });

const importFileParser = async (event: S3Event) => {
  console.log('FILE PARSER S3 ObjectCreated EVENT: ', event);

  event.Records.forEach((record) => {
    s3.getObject({
      Bucket,
      Key: record.s3.object.key,
    })
    .createReadStream()
    .pipe(csv())
    .on('data', (data) => {
      console.log(data);
    })
    .on('end', async () => {
      await s3.copyObject({
        Bucket,
        CopySource: `${Bucket}/${record.s3.object.key}`,
        Key: record.s3.object.key.replace(S3_BUCKET_FOLDER_UPLOAD, S3_BUCKET_FOLDER_PARSE),
      }).promise();

      console.log(`
        COPIED FROM ${Bucket}/${record.s3.object.key} TO ${Bucket}/${record.s3.object.key}
      `);
    })
    .on('error', (error) => {
      console.error('[ERROR] FILE PARSER S3 ObjectCreated ERROR: ', error);
    })
  });
}

export const main = middyfy(importFileParser);
