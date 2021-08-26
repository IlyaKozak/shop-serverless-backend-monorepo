import { Client, QueryConfig } from 'pg';

import { Product } from '../types/product';
import { productsTable, stocksTable } from '../common/constants';

const client = new Client();
client.connect();

export class ProductService {
  static async getProductsList(): Promise<Product[] | null> {
    const sql: QueryConfig = {
      text: `
        SELECT ${productsTable}.id, title, description, price, src, count
        FROM ${productsTable}
        LEFT JOIN ${stocksTable} ON ${productsTable}.id = ${stocksTable}.product_id;
      `,
    };

    const { rows } = await client.query(sql);
    return rows ? rows : null;
  }

  static async getProductById(id: string): Promise<Product | null> {
    const sql: QueryConfig = {
      text: `
        SELECT ${productsTable}.id, title, description, price, src, count
        FROM ${productsTable}
        LEFT JOIN ${stocksTable} ON ${productsTable}.id = ${stocksTable}.product_id
        WHERE ${productsTable}.id = $1;
      `,
      values: [id],
    };

    const { rows } = await client.query(sql);
    return rows[0] ? rows[0] : null;
  }

  static async createProduct(product: any): Promise<Product | null> {
    let productId;

    try {
      await client.query('BEGIN;');
  
      const sqlInsertProduct: QueryConfig = {
        text: `INSERT INTO ${productsTable} (title, description, price, src) VALUES ($1, $2, $3, $4) RETURNING id;`,
        values: [product.title, product.description, product.price, product.src],
      };
  
      const { rows: productsRows } = await client.query(sqlInsertProduct);
      productId = productsRows[0].id;

      const sqlInsertStocks: QueryConfig = {
        text: `INSERT INTO ${stocksTable} (product_id, count) VALUES ($1, $2);`,
        values: [productId, product.count],
      };

      await client.query(sqlInsertStocks);
      await client.query('COMMIT;');

    } catch (error) {
      await client.query('ROLLBACK;');
      throw error;
    }

    return ProductService.getProductById(productId);
  }
}
