import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useCreateProduct } from "./useCreateProduct";
import { mockProduct } from "../../../test/mocks/products";
import type { CreateProductRequest } from "../interfaces/product-mutations";

vi.mock("../services/actions/create-product", () => ({
  createProduct: vi.fn(),
}));

import { createProduct } from "../services/actions/create-product";
const mockedCreateProduct = vi.mocked(createProduct);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

  return {
    wrapper: ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client= { queryClient } > { children } </QueryClientProvider>
    ),
queryClient,
  };
};

describe("useCreateProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería crear un producto exitosamente", async () => {
    mockedCreateProduct.mockResolvedValueOnce(mockProduct);
    const { wrapper, queryClient } = createWrapper();

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useCreateProduct(), { wrapper });

    const requestData: CreateProductRequest = {
      code: "TCO007",
      name: "Tarjeta de Crédito Oro",
      description: "Programa de recompensas.",
      price: 0.0,
      categoryId: 1,
    };

    act(() => {
      result.current.mutate(requestData);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedCreateProduct).toHaveBeenCalledWith(requestData);
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["products"] });
  });

  it("debería manejar errores en la creación", async () => {
    mockedCreateProduct.mockRejectedValueOnce(new Error("Validation error"));
    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useCreateProduct(), { wrapper });

    act(() => {
      result.current.mutate({
        code: "",
        name: "",
        description: "",
        price: 0,
        categoryId: 0,
      });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe("Validation error");
  });
});
