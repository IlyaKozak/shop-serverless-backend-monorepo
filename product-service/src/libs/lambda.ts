import { Handler } from 'aws-lambda';
import middy from '@middy/core';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';

export const middyfy = (handler: Handler) => {
  return middy(handler).use([
    httpEventNormalizer(),
    httpErrorHandler(),
    cors({
      credentials: true,
    }),
  ]);
};
