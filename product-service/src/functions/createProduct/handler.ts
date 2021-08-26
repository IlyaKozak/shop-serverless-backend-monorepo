import 'source-map-support/register';

import { APIGatewayEvent } from 'aws-lambda';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import schema from './schema';
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway';
import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { ProductService } from '../../services/product-service';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: APIGatewayEvent) => {
  let product;

  try {
    product = await ProductService.createProduct(event.body);
  } catch (error) {
    throw new createError.InternalServerError(JSON.stringify({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error,
    }));
  }

  return formatJSONResponse(product);
};

export const main = middyfy(createProduct);