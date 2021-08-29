import { Client, QueryConfig } from 'pg';

import { Product } from '../types/product';
import { productsTable, stocksTable } from '../common/constants';
import { ProductServiceMock } from '../tests/mock/product-service-mock';

class ProductService {
  static client: Client | null = null;

  static async createConnection() {
    ProductService.client = new Client();
    await ProductService.client.connect();
  }

  static async closeConnection() {
    await ProductService.client.end();
    ProductService.client = null;
  }

  static async getProductsList(): Promise<Product[] | null> {
    if (!ProductService.client) {
      await ProductService.createConnection();
    }

    const sql: QueryConfig = {
      text: `
        SELECT ${productsTable}.id, title, description, price, src, count
        FROM ${productsTable}
        LEFT JOIN ${stocksTable} ON ${productsTable}.id = ${stocksTable}.product_id;
      `,
    };

    const { rows } = await ProductService.client.query(sql);

    return rows ? rows : null;
  }

  static async getProductById(id: string): Promise<Product | null> {
    if (!ProductService.client) {
      await ProductService.createConnection();
    }

    const sql: QueryConfig = {
      text: `
        SELECT ${productsTable}.id, title, description, price, src, count
        FROM ${productsTable}
        LEFT JOIN ${stocksTable} ON ${productsTable}.id = ${stocksTable}.product_id
        WHERE ${productsTable}.id = $1;
      `,
      values: [id],
    };

    const { rows } = await ProductService.client.query(sql);

    return rows[0] ? rows[0] : null;
  }

  static async createProduct(product: any): Promise<Product | null> {
    if (!ProductService.client) {
      await ProductService.createConnection();
    }

    let productId;

    try {
      await ProductService.client.query('BEGIN;');
  
      const sqlInsertProduct: QueryConfig = {
        text: `INSERT INTO ${productsTable} (title, description, price, src) VALUES ($1, $2, $3, $4) RETURNING id;`,
        values: [product.title, product.description, product.price, product.src],
      };
  
      const { rows: productsRows } = await ProductService.client.query(sqlInsertProduct);
      productId = productsRows[0].id;

      const sqlInsertStocks: QueryConfig = {
        text: `INSERT INTO ${stocksTable} (product_id, count) VALUES ($1, $2);`,
        values: [productId, product.count],
      };

      await ProductService.client.query(sqlInsertStocks);
      await ProductService.client.query('COMMIT;');

    } catch (error) {
      await ProductService.client.query('ROLLBACK;');

      throw error;
    }

    return ProductService.getProductById(productId);
  }
}

// Jest Testing Settings
const { NODE_ENV } = process.env;
const ProductServiceAPI = NODE_ENV === 'test' ? ProductServiceMock : ProductService;

export {
  ProductServiceAPI as ProductService
};
