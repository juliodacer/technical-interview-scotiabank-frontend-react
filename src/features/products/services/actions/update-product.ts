import type { UpdateProductRequest } from "../../interfaces/product-mutations";
import type { Product } from "../../interfaces/product.response";
import { productApi } from "../api/productApi";

export const updateProduct = async (
  id: number,
  data: UpdateProductRequest
): Promise<Product> => {
  const response = await productApi.patch<Product>(
    `${import.meta.env.VITE_API_URL}/products/${id}`,
    data
  );
  return response.data;
};
