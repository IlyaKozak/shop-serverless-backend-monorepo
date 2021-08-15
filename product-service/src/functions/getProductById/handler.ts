import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { validate as uuidValidate } from 'uuid';

import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { ProductService } from '../../services/product-service';

export const getProductById = async (event) => {
  const { id } = event.pathParameters;
  if (!uuidValidate(id)) {
    throw new createError.BadRequest(JSON.stringify({
      statusCode: StatusCodes.BAD_REQUEST,
      message: `ID "${id}" is not valid uuid!`,
    }));    
  }
  
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
