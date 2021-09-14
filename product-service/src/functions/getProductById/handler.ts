import { APIGatewayEvent } from 'aws-lambda';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { validate as uuidValidate } from 'uuid';

import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { ProductService } from '../../services/product-service';

export const getProductById = async (event: APIGatewayEvent) => {
  console.log('[INFO] GET PRODUCTS/{ID} EVENT OBJECT: ', event);

  const { id } = event.pathParameters;
  
  if (!uuidValidate(id)) {
    throw new createError.BadRequest(`ID "${id}" is not valid uuid!`);    
  }
  
  let product;

  try {
    product = await ProductService.getProductById(id);
  } catch (error) {
    console.error('[ERROR] GET PRODUCTS/{ID} ERROR: ', error);

    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR, 
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      { expose: true }
    );
  }

  if (!product) {
    throw new createError.NotFound(`Product with ID "${id}" not found!`);
  }
  
  return formatJSONResponse(product);
};

export const main = middyfy(getProductById);
