import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useProducts } from "./useProducts";
import { mockProductResponse } from "../../../test/mocks/products";

vi.mock("../services/actions/get-products-by-query", () => ({
  getProductsByQuery: vi.fn(),
}));

import { getProductsByQuery } from "../services/actions/get-products-by-query";
const mockedGetProducts = vi.mocked(getProductsByQuery);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería obtener productos con parámetros por defecto", async () => {
    mockedGetProducts.mockResolvedValueOnce(mockProductResponse);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedGetProducts).toHaveBeenCalledWith({
      page: 1,
      size: 5,
      q: undefined,
      category: undefined,
      state: undefined,
    });
    expect(result.current.data).toEqual(mockProductResponse);
  });

  it("debería pasar parámetros de filtro correctamente", async () => {
    mockedGetProducts.mockResolvedValueOnce(mockProductResponse);

    const { result } = renderHook(
      () =>
        useProducts({
          page: 2,
          size: 10,
          q: "oro",
          category: "Tarjeta",
          state: true,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedGetProducts).toHaveBeenCalledWith({
      page: 2,
      size: 10,
      q: "oro",
      category: "Tarjeta",
      state: true,
    });
  });

  it("debería manejar errores correctamente", async () => {
    mockedGetProducts.mockRejectedValueOnce(new Error("API error"));

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
