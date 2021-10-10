import 'source-map-support/register';
import { APIGatewayAuthorizerEvent } from 'aws-lambda';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';

const generatePolicy = (principalId: string, resource: string, effect = 'Deny') => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        }
      ],
    }
  }
};

const basicAuthrorizer = async (event: APIGatewayAuthorizerEvent) => {
  if (event.type !== 'TOKEN') {
    throw createError(
      StatusCodes.UNAUTHORIZED, 
      ReasonPhrases.UNAUTHORIZED, 
      { expose: true },
    );
  }

  try {
    const authorizationToken = event.authorizationToken;

    const [, encodedCredentials] = authorizationToken.split(' ');
    const buffer = Buffer.from(encodedCredentials, 'base64');
    const credentials = buffer.toString('utf-8').split(':');
    const [username, password] = credentials;

    console.log(`username: ${username}, password: ${password}`);

    const storedPassword = process.env[username];
    const effect = storedPassword === password ? 'Allow' : 'Deny';

    const policy = generatePolicy(encodedCredentials, event.methodArn, effect);

    return formatJSONResponse(policy);

  } catch (error) {
    throw createError(
      StatusCodes.UNAUTHORIZED, 
      ReasonPhrases.UNAUTHORIZED, 
      { expose: true },
    );
  }
}

export const main = middyfy(basicAuthrorizer);
