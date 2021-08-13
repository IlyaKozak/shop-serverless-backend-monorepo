import { Product } from "src/types/product";

export const formatJSONResponse = (response: Array<Product> | Product) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
