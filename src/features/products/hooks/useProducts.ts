import { useQuery } from "@tanstack/react-query";
import { getProductsByQuery } from "../services/actions/get-products-by-query";

interface UseProductsParams {
  page?: number;
  size?: number;
  q?: string;
  category?: string;
  state?: boolean;
}

export const useProducts = (params: UseProductsParams = {}) => {
  const { page = 1, size = 6, q, category, state } = params;

  return useQuery({
    queryKey: ["products", page, size, q, category, state],
    queryFn: () => getProductsByQuery({ page, size, q, category, state }),
    placeholderData: (previousData) => previousData,
  });
};
