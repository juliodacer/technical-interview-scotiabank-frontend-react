import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useDeleteProduct } from "./useDeleteProduct";

vi.mock("../services/actions/delete-product", () => ({
  deleteProduct: vi.fn(),
}));

import { deleteProduct } from "../services/actions/delete-product";
const mockedDeleteProduct = vi.mocked(deleteProduct);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

  return {
    wrapper: ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
    queryClient,
  };
};

describe("useDeleteProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería eliminar un producto exitosamente", async () => {
    mockedDeleteProduct.mockResolvedValueOnce(undefined);
    const { wrapper, queryClient } = createWrapper();

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useDeleteProduct(), { wrapper });

    act(() => {
      result.current.mutate(10);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedDeleteProduct).toHaveBeenCalledWith(10);
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["products"] });
  });

  it("debería manejar errores en la eliminación", async () => {
    mockedDeleteProduct.mockRejectedValueOnce(new Error("Not found"));
    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useDeleteProduct(), { wrapper });

    act(() => {
      result.current.mutate(999);
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe("Not found");
  });
});
