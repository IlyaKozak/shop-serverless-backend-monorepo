import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';

import { getProductById } from '../src/functions/getProductById/handler';
import { APIGatewayEvent } from 'aws-lambda';

const APIGatewayEventMock: APIGatewayEvent = {
  "body": "eyJ0ZXN0IjoiYm9keSJ9",
  "resource": "/{proxy+}",
  "path": "/path/to/resource",
  "httpMethod": "POST",
  "isBase64Encoded": true,
  "queryStringParameters": {
    "foo": "bar"
  },
  "multiValueQueryStringParameters": {
    "foo": [
      "bar"
    ]
  },
  "pathParameters": {
    "proxy": "/path/to/resource"
  },
  "stageVariables": {
    "baz": "qux"
  },
  "headers": {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, sdch",
    "Accept-Language": "en-US,en;q=0.8",
    "Cache-Control": "max-age=0",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "US",
    "Host": "1234567890.execute-api.eu-west-1.amazonaws.com",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Custom User Agent String",
    "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==",
    "X-Forwarded-For": "127.0.0.1, 127.0.0.2",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  "multiValueHeaders": {
    "Accept": [
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    ],
    "Accept-Encoding": [
      "gzip, deflate, sdch"
    ],
    "Accept-Language": [
      "en-US,en;q=0.8"
    ],
    "Cache-Control": [
      "max-age=0"
    ],
    "CloudFront-Forwarded-Proto": [
      "https"
    ],
    "CloudFront-Is-Desktop-Viewer": [
      "true"
    ],
    "CloudFront-Is-Mobile-Viewer": [
      "false"
    ],
    "CloudFront-Is-SmartTV-Viewer": [
      "false"
    ],
    "CloudFront-Is-Tablet-Viewer": [
      "false"
    ],
    "CloudFront-Viewer-Country": [
      "US"
    ],
    "Host": [
      "0123456789.execute-api.eu-west-1.amazonaws.com"
    ],
    "Upgrade-Insecure-Requests": [
      "1"
    ],
    "User-Agent": [
      "Custom User Agent String"
    ],
    "Via": [
      "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)"
    ],
    "X-Amz-Cf-Id": [
      "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA=="
    ],
    "X-Forwarded-For": [
      "127.0.0.1, 127.0.0.2"
    ],
    "X-Forwarded-Port": [
      "443"
    ],
    "X-Forwarded-Proto": [
      "https"
    ]
  },
  "requestContext": {
    "authorizer": null,
    "accountId": "123456789012",
    "resourceId": "123456",
    "stage": "prod",
    "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
    "requestTime": "09/Apr/2015:12:34:56 +0000",
    "requestTimeEpoch": 1428582896000,
    "identity": {
      "apiKey": null,
      "apiKeyId": null,
      "clientCert": null,
      "principalOrgId": null,
      "cognitoIdentityPoolId": null,
      "accountId": null,
      "cognitoIdentityId": null,
      "caller": null,
      "accessKey": null,
      "sourceIp": "127.0.0.1",
      "cognitoAuthenticationType": null,
      "cognitoAuthenticationProvider": null,
      "userArn": null,
      "userAgent": "Custom User Agent String",
      "user": null
    },
    "path": "/prod/path/to/resource",
    "resourcePath": "/{proxy+}",
    "httpMethod": "POST",
    "apiId": "1234567890",
    "protocol": "HTTP/1.1"
  }
};

describe('getProductById function', () => {
  it('should return one product by id', async () => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
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

  it('should return object with statuscode and body properties', async () => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
      pathParameters: {
        id: '002bac9b-d526-48ef-99e3-abc8358b39e3'
      }
    };

    const result = await getProductById(event);

    expect(result).toHaveProperty('statusCode');
    expect(result).toHaveProperty('body');
  }); 

  it('should throw bad-request error for no uuid provided', async () => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
      pathParameters: { }
    };

    await expect(getProductById(event))
      .rejects.toThrowError(new createError.BadRequest(JSON.stringify({
      statusCode: StatusCodes.BAD_REQUEST,
      message: `ID "undefined" is not valid uuid!`,
    })));
  });

  it('should throw bad-request error for incorrect uuid provided', async () => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
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

  it('should throw not-found error if product doesn\'t exist', async () => {
    const event: APIGatewayEvent = {
      ...APIGatewayEventMock,
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
