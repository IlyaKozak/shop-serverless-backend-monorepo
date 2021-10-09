import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { StatusCodes } from 'http-status-codes';

import { main as importProductsFile } from '../functions/importProductsFile/handler';
import { APIGatewayEventMock, contextMock } from './mocks/apiGatewayMock';
import { s3SignedUrlMock } from './mocks/s3SignedUrlMock';

describe('importProductsFile function', () => {
  it('returns signed url for S3', async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock(
      'S3', 
      'getSignedUrl', 
      (_action: string, _params: object, callback: (err: Error, url: string) => void) => {
      callback(null, s3SignedUrlMock);
    });

    const { body } = await importProductsFile(APIGatewayEventMock, contextMock, () => {});
    
    AWSMock.restore('S3');

    expect(JSON.parse(body)).toBe(s3SignedUrlMock);
  });

  it('returns status code 200 (OK)', async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock(
      'S3', 
      'getSignedUrl', 
      (_action: string, _params: object, callback: (err: Error, url: string) => void) => {
      callback(null, s3SignedUrlMock);
    });

    const { statusCode } = await importProductsFile(APIGatewayEventMock, contextMock, () => {});
    
    AWSMock.restore('S3');

    expect(statusCode).toBe(StatusCodes.OK);
  });
});
