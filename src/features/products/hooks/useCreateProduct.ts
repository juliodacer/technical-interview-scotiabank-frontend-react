import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/actions/create-product";
import type { CreateProductRequest } from "../interfaces/product-mutations";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
