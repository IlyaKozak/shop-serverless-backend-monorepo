import { Product } from '../../types/product';
import products from './products.json';

export class ProductServiceMock {
  static getProductsList(): Promise<Product[]> {
    return Promise.resolve(products);
  }

  static getProductById(id: string): Promise<Product> {
    return Promise.resolve(products.find((product: Product) => product.id === id));
  }
}
