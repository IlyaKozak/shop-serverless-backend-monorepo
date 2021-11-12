import { Request, Response } from 'express';
import axios, { AxiosRequestConfig, Method } from 'axios';
import * as NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 2 * 60 });

export async function bffMiddleware(req: Request, res: Response) {
  const { method, body } = req;
  
  const originalUrl = req.originalUrl.replace(/\/*$/, '');
  console.log(
    `originalUrl: ${originalUrl}, method: ${method}, body: ${JSON.stringify(
      body,
    )}`,
  );

  if (originalUrl === '') {
    return res.send('BFF service is running...');
  }

  if (
    method === 'GET' &&
    /^\/product\/products$/.test(originalUrl) &&
    cache.has(originalUrl)
  ) {
    const result = JSON.parse(cache.get(originalUrl));
    console.log(`Result from cache...`);

    return res.json(result);
  }

  const recipient = originalUrl.split('/')[1];
  const recipientUrl = process.env[recipient];

  if (recipientUrl) {
    const axiosConfig: AxiosRequestConfig = {
      method: method as Method,
      url: `${recipientUrl.replace(/\/*$/, '')}${req.originalUrl.replace(
        /\/[^/]*/,
        '',
      )}`,
      ...(Object.keys(body || {}).length > 0 && { data: body }),
    };

    console.log(`axiosConfig: ${JSON.stringify(axiosConfig)}`);

    try {
      const response = await axios(axiosConfig);

      if (
        method === 'GET' &&
        /^\/product\/products$/.test(originalUrl)
      ) {
        cache.set(originalUrl, JSON.stringify(response.data));
      }
      
      return res.json(response.data);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        return res.status(status).json(data);
      }

      return res.status(500).json({
        error: error.message,
      });
    }
  } else {
    return res.status(502).json({
      error: 'Cannot process request',
    });
  }
}
