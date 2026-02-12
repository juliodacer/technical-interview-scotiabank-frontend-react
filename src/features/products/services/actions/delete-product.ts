import { productApi } from "../api/productApi";

export const deleteProduct = async (id: number): Promise<void> => {
  await productApi.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
};
