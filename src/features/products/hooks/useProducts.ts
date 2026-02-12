import { useQuery } from "@tanstack/react-query";
import { getProductsByQuery } from "../services/actions/get-products-by-query";

export const useProducts = (page: number, size: number, query?: string) => {
  return useQuery({
    queryKey: ["products", page, size, query],
    queryFn: () => getProductsByQuery(page, size, query),
    placeholderData: (previousData) => previousData,
  });
};
