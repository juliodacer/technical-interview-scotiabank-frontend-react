import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/actions/get-product-by-id";

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id && id > 0,
  });
};
