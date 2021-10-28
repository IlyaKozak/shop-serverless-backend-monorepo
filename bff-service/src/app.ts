import express, { Request, Response, NextFunction } from 'express';
import axios, { AxiosRequestConfig, Method } from 'axios';
import responseTime from 'response-time';
import nodeCache from 'node-cache';

const app = express();
const cache = new nodeCache({ stdTTL: 2 * 60 });

app.use(responseTime());
app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send(`Service is running ...`);
    return;
  }
  next();
});


app.all('/*', async (req: Request, res: Response) => {
  const { method, body } = req;
  const originalUrl = req.originalUrl.replace(/\/*$/, '');
  console.log(`originalUrl: ${originalUrl}, method: ${method}, body: ${JSON.stringify(body)}`);
  
  if (method === 'GET' && /^\/product\/products$/.test(originalUrl) && cache.has(originalUrl)) {
    const result = JSON.parse(cache.get(originalUrl));
    console.log(`Result from cache...`);

    res.json(result);
    return;
  }

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

      cache.set(originalUrl, JSON.stringify(response.data));
      
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