import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../services/actions/update-product";
import type { UpdateProductRequest } from "../interfaces/product-mutations";

interface UpdateProductParams {
  id: number;
  data: UpdateProductRequest;
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProductParams) => updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
};
