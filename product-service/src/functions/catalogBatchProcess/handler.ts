import { SQSEvent } from 'aws-lambda';

import { ProductService } from 'src/services/product-service';
import { middyfy } from '../../libs/lambda';

export const catalogBatchProcess = async (event: SQSEvent) => {
  try {
    for (const record of event.Records) {

      const product = await ProductService.createProduct(JSON.parse(record.body));

      if (product.id) {
        console.log(`product id: ${product.id}`);
      }
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const main = middyfy(catalogBatchProcess);
