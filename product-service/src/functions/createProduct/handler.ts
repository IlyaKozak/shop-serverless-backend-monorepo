import 'source-map-support/register';

import { APIGatewayEvent } from 'aws-lambda';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import schema from './schema';
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway';
import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { ProductService } from '../../services/product-service';
import { urlRegExp } from '../../common/constants';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: APIGatewayEvent) => {
  console.log('POST PRODUCTS/ EVENT OBJECT: ', event);

  let parsedBody;

  try {
    parsedBody = JSON.parse(event.body);
  } catch {
    throw createError(
      StatusCodes.BAD_REQUEST,
      JSON.stringify({
        message: 'Payload should be an object!'
      })
    );
  }

  if (!parsedBody.title) {
    throw createError(
      StatusCodes.BAD_REQUEST,
      JSON.stringify({
        message: 'Title is a required field!'
      })
    );
  }

  if (parsedBody.count && (!Number.isInteger(parsedBody.count) || parsedBody.count < 0)) {
    throw createError(
      StatusCodes.BAD_REQUEST,
      JSON.stringify({
        message: 'Count should be an integer >= 0!'
      })
    );
  }

  if (parsedBody.price && 
    ((Number.parseFloat(parsedBody.price) !== parsedBody.price) || parsedBody.price < 0)) {
    throw createError(
      StatusCodes.BAD_REQUEST,
      JSON.stringify({
        message: 'Price should be a number >= 0!'
      })
    );
  }

  if (parsedBody.description && typeof parsedBody.description !== 'string') {
    throw createError(
      StatusCodes.BAD_REQUEST,
      JSON.stringify({
        message: 'Description should be a text!'
      })
    );
  }

  if (parsedBody.src && !urlRegExp.test(parsedBody.src)) {
    throw createError(
      StatusCodes.BAD_REQUEST,
      JSON.stringify({
        message: 'Src should be a valid url!'
      })
    );
  }

  let product;

  try {
    product = await ProductService.createProduct(parsedBody);
  } catch (error) {
    console.error('[ERROR] POST PRODUCTS/ ERROR: ', error);

    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR, 
      ReasonPhrases.INTERNAL_SERVER_ERROR, 
      { expose: true }
    );
  }

  return formatJSONResponse(product);
};

export const main = middyfy(createProduct);