import 'source-map-support/register';

import { APIGatewayEvent } from 'aws-lambda';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import schema from './schema';
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway';
import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { ProductService } from '../../services/product-service';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: APIGatewayEvent) => {
  console.log('POST PRODUCTS/ EVENT OBJECT: ', event);

  let product;

  try {
    product = await ProductService.createProduct(event.body);
  } catch (error) {
    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR, 
      ReasonPhrases.INTERNAL_SERVER_ERROR, 
      { expose: true }
    );
  }

  return formatJSONResponse(product);
};

export const main = middyfy(createProduct);