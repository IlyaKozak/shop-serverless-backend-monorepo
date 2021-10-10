import { handlerPath } from '../../libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        },
        // authorizer: {
        //   name: 'basicAuthorizer',
        //   arn: {
        //     'Fn::ImportValue': 'basicAuthorizerQualifiedArn',
        //   },
        //   resultTtlInSeconds: 0,
        //   identitySource: 'method.request.header.Authorization',
        //   type: 'token',
        // }
      }
    }
  ]
};
