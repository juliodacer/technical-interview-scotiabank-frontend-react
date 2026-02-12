import type {
  Product,
  ProductResponse,
} from "../../interfaces/product.response";
import { productApi } from "../api/productApi";

export const getProductsByQuery = async (): Promise<Product[]> => {
  const response = await productApi.get<ProductResponse>(
    `${import.meta.env.VITE_API_URL}/products`,
    {
      params: {
        page: 1,
        size: 10,
      },
    },
  );
  return response.data.products;
};
