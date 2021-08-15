import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';

import { getProductById } from '../src/functions/getProductById/handler';

describe('getProductById function', () => {
  test('should return one product by id', async () => {
    const event = {
      pathParameters: {
        id: '002bac9b-d526-48ef-99e3-abc8358b39e3'
      }
    };

    const result = await getProductById(event);
    const product = JSON.parse(result.body);

    expect(product).toEqual({
      "count": 7,
      "description": "Mitchell MD200 Double-Cutaway",
      "id": "002bac9b-d526-48ef-99e3-abc8358b39e3",
      "price": 199.00,
      "title": "Mitchell MD200",
      "src": "https://images.unsplash.com/photo-1508186736123-44a5fcb36f9f?&w=500"
    });
  });

  test('should return object with statuscode and body properties', async () => {
    const event = {
      pathParameters: {
        id: '002bac9b-d526-48ef-99e3-abc8358b39e3'
      }
    };

    const result = await getProductById(event);

    expect(result).toHaveProperty('statusCode');
    expect(result).toHaveProperty('body');
  }); 

  test('should throw bad-request error for no uuid provided', async () => {
    const event = {
      pathParameters: { }
    };

    await expect(getProductById(event))
      .rejects.toThrowError(new createError.BadRequest(JSON.stringify({
      statusCode: StatusCodes.BAD_REQUEST,
      message: `ID "undefined" is not valid uuid!`,
    })));
  });

  test('should throw bad-request error for incorrect uuid provided', async () => {
    const event = {
      pathParameters: {
        id: 'not-valid-uuid'
      }
    };

    await expect(getProductById(event))
      .rejects.toThrowError(new createError.BadRequest(JSON.stringify({
      statusCode: StatusCodes.BAD_REQUEST,
      message: `ID "${event.pathParameters.id}" is not valid uuid!`,
    })));
  });

  test('should throw not-found error if product doesn\'t exist', async () => {
    const event = {
      pathParameters: {
        id: 'ab39d30c-6c28-4679-9ce9-bff3064c082a'
      }
    };

    await expect(getProductById(event))
      .rejects.toThrowError(new createError.NotFound(JSON.stringify({
        statusCode: StatusCodes.NOT_FOUND,
        message: `Product with ID "${event.pathParameters.id}" not found!`,
      })));
  });
});
