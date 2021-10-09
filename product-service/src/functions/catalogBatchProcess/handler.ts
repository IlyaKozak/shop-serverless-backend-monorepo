import { SQSEvent } from 'aws-lambda';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { ProductService } from 'src/services/product-service';
import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';

export const catalogBatchProcess = async (event: SQSEvent) => {
  try {
    for (const record of event.Records) {

      const product = await ProductService.createProduct(JSON.parse(record.body));

      if (product.id) {
        console.log(`product: ${product}`);

        return formatJSONResponse(product);
      }
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);

    throw createError(
      StatusCodes.INTERNAL_SERVER_ERROR, 
      ReasonPhrases.INTERNAL_SERVER_ERROR, 
      { expose: true },
    );
  }
};

export const main = middyfy(catalogBatchProcess);
