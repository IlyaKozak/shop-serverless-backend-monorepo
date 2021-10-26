import express, { Request, Response, NextFunction } from 'express';
import axios, { AxiosRequestConfig, Method } from 'axios';

const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send(`Service is running ...`);
    return;
  }
  next();
});


app.all('/*', async (req: Request, res: Response) => {
  const { originalUrl, method, body } = req;
  console.log(`originalUrl: ${originalUrl}, method: ${method}, body: ${JSON.stringify(body)}`);

  const recipient = originalUrl.split('/')[1];
  const recipientUrl = process.env[recipient];

  if (recipientUrl) {
    const axiosConfig: AxiosRequestConfig = {
      method: method as Method,
      url: `${recipientUrl.replace(/\/*$/, '')}${req.originalUrl.replace(/\/[^/]*/, '')}`,
      ...(Object.keys(body || {}).length > 0 && { data: body })
    };

    console.log(`axiosConfig: ${JSON.stringify(axiosConfig)}`);

    try {
      const response = await axios(axiosConfig);
      res.json(response.data);
    } catch (error) {
      if (error.response) {
        const {
          status,
          data
        } = error.response;

        res.status(status).json(data);
        return;
      }

      res.status(500).json({
        error: error.message,
      });
    }
  } else {
    res.status(502).json({
      error: 'Cannot process request',
    });
  }
});

export default app;