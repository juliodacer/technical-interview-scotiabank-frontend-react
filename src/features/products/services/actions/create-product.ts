import type { CreateProductRequest } from "../../interfaces/product-mutations";
import type { Product } from "../../interfaces/product.response";
import { productApi } from "../api/productApi";

export const createProduct = async (
  data: CreateProductRequest
): Promise<Product> => {
  const response = await productApi.post<Product>(
    `${import.meta.env.VITE_API_URL}/products`,
    data
  );
  return response.data;
};
