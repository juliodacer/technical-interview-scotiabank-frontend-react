import type { Product } from "../../interfaces/product.response";
import { productApi } from "../api/productApi";

export const getProductById = async (id: number): Promise<Product> => {
  const response = await productApi.get<Product>(
    `${import.meta.env.VITE_API_URL}/products/${id}`,
  );
  console.log("response.data", response.data);
  return response.data;
};
