import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import * as products from '../../assets/products.json'
import { Product } from 'src/types/product';

const getProductsList = async () => {
  return formatJSONResponse(products as Array<Product>);
};

export const main = middyfy(getProductsList);
