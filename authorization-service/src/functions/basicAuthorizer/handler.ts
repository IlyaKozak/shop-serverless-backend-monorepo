import 'source-map-support/register';
import { APIGatewayAuthorizerEvent } from 'aws-lambda';

import { middyfy } from '../../libs/lambda';

const generatePolicy = (principalId: string, resource: string, effect: 'Allow' | 'Deny') => {
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
    throw new Error('Unauthorized');
  }

  const authorizationToken = event.authorizationToken;

  if (!authorizationToken) {
    throw new Error('Unauthorized');
  }

  let username, password, encodedCredentials;

  try {
    [, encodedCredentials] = authorizationToken.split(' ');
    const buffer = Buffer.from(encodedCredentials, 'base64');
    const credentials = buffer.toString('utf-8').split(':');
    [username, password] = credentials;
  } catch {
    throw new Error('Unauthorized');    
  }

    console.log(`username: ${username}, password: ${password}`);
  
    const storedPassword = process.env[username];

    const effect = storedPassword && (storedPassword === password) ? 'Allow' : 'Deny';
  
    const policy = generatePolicy(encodedCredentials, event.methodArn, effect);
  
    return policy;
}

export const main = middyfy(basicAuthrorizer);
