import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { ProductService } from '../../services/product-service';

const getProductById = async (event) => {
  const { id } = event.pathParameters;
  
  let product;

  try {
    product = await ProductService.getProductById(id);
  } catch (error) {
    throw new createError.InternalServerError(JSON.stringify({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error,
    }));
  }

  if (!product) {
    throw new createError.NotFound(JSON.stringify({
      statusCode: StatusCodes.NOT_FOUND,
      message: `Product with ID "${id}" not found!`,
    }));
  }
  
  return formatJSONResponse(product);
};

export const main = middyfy(getProductById);
