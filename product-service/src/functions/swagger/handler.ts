import express, { Application } from 'express';
import serverless from 'serverless-http';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../swagger/product-service-swagger.json';

const app: Application = express();

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export const main = serverless(app);
