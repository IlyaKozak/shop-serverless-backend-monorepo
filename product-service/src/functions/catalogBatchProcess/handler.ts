import { SQSEvent } from 'aws-lambda';
import AWS from 'aws-sdk';

import { ProductService } from 'src/services/product-service';
import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';

import { AWS_REGION } from '../../common/constants';

const sns = new AWS.SNS({ region: AWS_REGION });

export const catalogBatchProcess = async (event: SQSEvent) => {
  const createdProducts = [];

  for await (const record of event.Records) {
    try {
      const product = await ProductService.createProduct(JSON.parse(record.body));

      if (product.id) {
        createdProducts.push(product);

        await sns.publish({
          Subject: `New product with ID ${product.id} is created.`,
          Message: JSON.stringify(product),
          MessageAttributes: {
            price: {
              DataType: 'Number',
              StringValue: String(product.price),
            },
            count: {
              DataType: 'Number',
              StringValue: String(product.count),
            },
          },
          TopicArn: process.env.SNS_ARN,
        }).promise();
  
        console.log(`Product is created: ${JSON.stringify(product)}`);
      }

    } catch(error) {
      console.error(`${error.message}`);
    }
  }

  return formatJSONResponse(createdProducts);
};

export const main = middyfy(catalogBatchProcess);
