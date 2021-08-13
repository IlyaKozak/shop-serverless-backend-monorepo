import { getProductsList } from '../src/functions/getProductsList/handler';

describe('getProductsList function', () => {
  it('should return all products', async () => {
    const result = await getProductsList();
    expect(JSON.parse(result.body)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          count: 7,
        })
      ])
    );
  })
});