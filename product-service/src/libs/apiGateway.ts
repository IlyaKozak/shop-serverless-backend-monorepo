import { StatusCodes } from 'http-status-codes';
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

import { Product } from '../types/product';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;

export const formatJSONResponse = (response: Array<Product> | Product) => {
  return {
    statusCode: StatusCodes.OK,
    body: JSON.stringify(response),
  };
};
