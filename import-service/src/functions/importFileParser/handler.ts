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
  console.log('EVENT: ', event);
  
  for (const record of event.Records) {
    const { key } = record.s3.object;

    await new Promise((resolve, reject) => {
      const s3Stream = s3.getObject({
        Bucket,
        Key: key,
      }).createReadStream();
  
      s3Stream.pipe(csv())
        .on('data', (data) => {
          console.log(data);
        })
        .on('error', (error) => {
          reject(error);
        })
        .on('end', async () => {
          const newKey = record.s3.object.key.replace(S3_BUCKET_FOLDER_UPLOAD, S3_BUCKET_FOLDER_PARSE);
  
          await s3.copyObject({
            Bucket,
            CopySource: `${Bucket}/${record.s3.object.key}`,
            Key: newKey,
          }).promise();
        
          await s3.deleteObject({
            Bucket,
            Key: key,
          }).promise();

          console.log(`
            COPIED FROM ${Bucket}/${key} TO ${Bucket}/${newKey}
          `);

          resolve('done');
        });
    });
  }
};

export const main = middyfy(importFileParser);
