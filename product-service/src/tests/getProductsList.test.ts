import { getProductsList } from '../functions/getProductsList/handler';
import products from './mock/products.json';
import { APIGatewayEventMock as event } from './mock/apiGatewayMock'; 

describe('getProductsList function', () => {
  it('returns all products', async () => {
    const result = await getProductsList(event);

    expect(JSON.parse(result.body)).toEqual(
      expect.arrayContaining(products)
    );
  });

  it('every product contains count, description, id, price, title, src properties', async () => {
    const result = await getProductsList(event);
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
