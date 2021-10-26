import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

export const {
  PORT,
  CART_SERVICE_URL,
  PRODUCT_SERVICE_URL,
} = process.env;