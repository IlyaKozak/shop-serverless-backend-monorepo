import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { ProductService } from '../../services/product-service';

export const getProductsList = async () => {
  let products;

  try {
    products = await ProductService.getProductsList();
  } catch (error) {
    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR, 
      ReasonPhrases.INTERNAL_SERVER_ERROR, 
      { expose: true }
    );
  }

  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
