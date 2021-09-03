import { APIGatewayEvent } from 'aws-lambda';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { ProductService } from '../../services/product-service';

export const getProductsList = async (event: APIGatewayEvent) => {
  console.log('GET PRODUCTS/ EVENT OBJECT: ', event);

  let products;

  try {
    products = await ProductService.getProductsList();
  } catch (error) {
    console.error('[ERROR] GET PRODUCTS/ ERROR: ', error);

    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR, 
      ReasonPhrases.INTERNAL_SERVER_ERROR, 
      { expose: true }
    );
  }

  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
