import { handlerPath } from '../../libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'swagger',
        cors: true,
      },
    },
    {
      http: {
        method: 'get',
        path: 'swagger/{proxy+}',
        cors: true,
      },
    },
  ]
};
