import products from '../assets/products.json';
import { Product } from '../types/product';

export class ProductService {
  static getProductsList(): Promise<Product[]> {
    return Promise.resolve(products);
  }

  static getProductById(id: string): Promise<Product> {
    return Promise.resolve(products.find((product: Product) => product.id === id));
  }
}
