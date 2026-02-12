import type { Category } from "../../interfaces/category.response";
import { productApi } from "../api/productApi";

export const getCategories = async (): Promise<Category[]> => {
  const response = await productApi.get<Category[]>(
    `${import.meta.env.VITE_API_URL}/categories`
  );
  return response.data;
};
