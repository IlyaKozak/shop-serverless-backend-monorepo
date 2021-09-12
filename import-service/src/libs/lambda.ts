import { Handler } from 'aws-lambda';

import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';

export const middyfy = (handler: Handler) => {
  return middy(handler).use([
    middyJsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
    cors({
      credentials: true,
    }),
  ]);
}
