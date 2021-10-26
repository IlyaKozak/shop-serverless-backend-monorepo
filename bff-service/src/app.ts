import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send(`Service is running ...`);
    return;
  }
  next();
});

export default app;