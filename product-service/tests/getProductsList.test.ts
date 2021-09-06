import { getProductsList } from '../src/functions/getProductsList/handler';
import products from '../src/assets/products.json';

describe('getProductsList function', () => {
  it('returns all products', async () => {
    const result = await getProductsList();

    expect(JSON.parse(result.body)).toEqual(
      expect.arrayContaining(products)
    );
  });

  it('every product contains count, description, id, price, title, src properties', async () => {
    const result = await getProductsList();
    const products = JSON.parse(result.body);

    for (const product of products) {
      expect(product).toHaveProperty('count');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('src');      
    }
  });
});
