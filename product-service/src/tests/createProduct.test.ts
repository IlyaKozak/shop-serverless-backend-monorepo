import { APIGatewayEvent } from 'aws-lambda';
import createError from 'http-errors';

import { createProduct } from '../functions/createProduct/handler';
import { getProductsList } from '../functions/getProductsList/handler';
import { APIGatewayEventMock, contextMock } from './mocks/apiGatewayMock';

describe('createProduct function', () => {
  it('creates a product', async () => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
      body: JSON.stringify({
        title: 'New Guitar',
        description: 'New Guitar Description',
        price: 55.55,
        count: 5,
        src: 'https://images.unsplash.com/photo-1563357989-f6cdbbae76cb?width=500',
      }),
    };

    const resultBeforeInsert = await getProductsList(event);

    await createProduct(event as any, contextMock, () => {});

    const resultAfterInsert = await getProductsList(event);
    console.log(JSON.parse(resultAfterInsert.body));

    expect(JSON.parse(resultBeforeInsert.body).length)
      .toBe(JSON.parse(resultAfterInsert.body).length - 1);
  });

  it('throws error if payload is not an object', async() => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
      body: 'string',
    };

    await expect(createProduct(event as any, contextMock, () => {}))
    .rejects.toThrowError(new createError.BadRequest(
      '{"message":"Payload should be an object!"}'
    ));
  });

  it('throws error if no title field provided', async() => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
      body: JSON.stringify({
      }),
    };

    await expect(createProduct(event as any, contextMock, () => {}))
    .rejects.toThrowError(new createError.BadRequest(
      '{"message":"Title is a required field!"}'
    ));
  });

  it('throws error if count field is not an integer >= 0', async() => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
      body: JSON.stringify({
        title: 'Some title',
        count: 'Not an integer',
      }),
    };

    await expect(createProduct(event as any, contextMock, () => {}))
    .rejects.toThrowError(new createError.BadRequest(
      '{"message":"Count should be an integer >= 0!"}'
    ));

    const event2: APIGatewayEvent = {
      ...APIGatewayEventMock,
      body: JSON.stringify({
        title: 'Some title',
        count: -5,
      }),
    };

    await expect(createProduct(event2 as any, contextMock, () => {}))
    .rejects.toThrowError(new createError.BadRequest(
      '{"message":"Count should be an integer >= 0!"}'
    ));
  });

  it('throws error if price field is not a number >= 0', async() => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
      body: JSON.stringify({
        title: 'Some title',
        price: 'Not a number',
      }),
    };

    await expect(createProduct(event as any, contextMock, () => {}))
    .rejects.toThrowError(new createError.BadRequest(
      '{"message":"Price should be a number >= 0!"}'
    ));

    const event2: APIGatewayEvent = {
      ...APIGatewayEventMock,
      body: JSON.stringify({
        title: 'Some title',
        price: -5,
      }),
    };

    await expect(createProduct(event2 as any, contextMock, () => {}))
    .rejects.toThrowError(new createError.BadRequest(
      '{"message":"Price should be a number >= 0!"}'
    ));
  });

  it('throws error if description field is not a text', async() => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
      body: JSON.stringify({
        title: 'Some title',
        description: 5,
      }),
    };

    await expect(createProduct(event as any, contextMock, () => {}))
    .rejects.toThrowError(new createError.BadRequest(
      '{"message":"Description should be a text!"}'
    ));
  });

  it('throws error if src field not a valid image url', async() => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
      body: JSON.stringify({
        title: 'Some title',
        src: 'bad url',
      }),
    };

    await expect(createProduct(event as any, contextMock, () => {}))
    .rejects.toThrowError(new createError.BadRequest(
      '{"message":"Src should be a valid url!"}'
    ));
  });
});
