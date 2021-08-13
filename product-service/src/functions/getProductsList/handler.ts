import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { ProductService } from '../../services/product-service';

export const getProductsList = async () => {
  let products;

  try {
    products = await ProductService.getProductsList();
  } catch (error) {
    throw new createError.InternalServerError(JSON.stringify({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error,
    }));
  }

  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
