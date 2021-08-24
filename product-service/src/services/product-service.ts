import { Client, QueryConfig } from 'pg';

import { Product } from '../types/product';

const client = new Client();
client.connect();
const productsTableName = 'products';

export class ProductService {
  static async getProductsList(): Promise<Product[] | null> {
    const query: QueryConfig = {
      text: `SELECT * FROM ${productsTableName}`,
    };

    const result = await client.query(query);
    return result.rows ? result.rows : null;
  }

  static async getProductById(id: string): Promise<Product | null> {
    const query: QueryConfig = {
      text: `SELECT * FROM ${productsTableName} WHERE id = $1`,
      values: [id],
    };

    const result = await client.query(query);
    return result.rows[0] ? result.rows[0] : null;
  }
}
