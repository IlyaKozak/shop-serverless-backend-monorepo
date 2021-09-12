// import { APIGatewayEvent } from 'aws-lambda';
// import createError from 'http-errors';

import { importProductsFile } from '../functions';

describe('importProductsFile function', () => {
  it('importProductsFile a product', async () => {
    console.log(importProductsFile);

    expect(2).toBe(2);
  });
});
