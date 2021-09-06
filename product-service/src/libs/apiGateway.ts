import { StatusCodes } from 'http-status-codes';
import { Product } from 'src/types/product';

export const formatJSONResponse = (response: Array<Product> | Product) => {
  return {
    statusCode: StatusCodes.OK,
    body: JSON.stringify(response)
  };
};
