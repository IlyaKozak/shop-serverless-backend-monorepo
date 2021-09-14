import { v4 as uuid } from 'uuid';

import { Product } from '../../types/product';
import products from './products.json';

export class ProductServiceMock {
  static getProductsList(): Promise<Product[]> {
    return Promise.resolve(products);
  }

  static getProductById(id: string): Promise<Product> {
    return Promise.resolve(products.find((product: Product) => product.id === id));
  }

  static createProduct({
    title,
    description = null,
    price = null,
    count = null,
    src = null,
  }: Product): Promise<Product | null> {
    const id = uuid();

    products.push({
      id,
      title,
      description,
      price,
      count,
      src,
    });

    return ProductServiceMock.getProductById(id);
  }
}
