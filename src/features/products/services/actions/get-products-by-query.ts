import type { ProductResponse } from "../../interfaces/product.response";
import { productApi } from "../api/productApi";

interface GetProductsParams {
  page?: number;
  size?: number;
  q?: string;
  category?: string;
  state?: boolean;
}

export const getProductsByQuery = async (
  params: GetProductsParams = {},
): Promise<ProductResponse> => {
  const { page = 1, size = 5, q, category, state } = params;

  const queryParams: Record<string, string | number | boolean> = {
    page,
    size,
  };

  if (q && q.trim() !== "") {
    queryParams.q = q.trim();
  }

  if (category && category.trim() !== "") {
    queryParams.category = category.trim();
  }

  if (state !== undefined) {
    queryParams.state = state;
  }

  const response = await productApi.get<ProductResponse>(
    `${import.meta.env.VITE_API_URL}/products`,
    {
      params: queryParams,
    },
  );
  return response.data;
};
