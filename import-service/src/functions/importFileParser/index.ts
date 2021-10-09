import { S3_BUCKET_FOLDER_UPLOAD } from '../../common/constants';
import { handlerPath } from '../../libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: '${env:S3_BUCKET}',
        event: 's3:ObjectCreated:*',
        existing: true,
        rules: [
          {
            prefix: `${S3_BUCKET_FOLDER_UPLOAD}/`,      
          },
          {
            suffix: '.csv',            
          }
        ],
      }
    }
  ]
};