import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../services/actions/delete-product";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
