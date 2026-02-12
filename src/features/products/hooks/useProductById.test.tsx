import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useProductById } from "./useProductById";
import { mockProduct } from "../../../test/mocks/products";

vi.mock("../services/actions/get-product-by-id", () => ({
  getProductById: vi.fn(),
}));

import { getProductById } from "../services/actions/get-product-by-id";
const mockedGetProductById = vi.mocked(getProductById);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useProductById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería obtener un producto por su ID", async () => {
    mockedGetProductById.mockResolvedValueOnce(mockProduct);

    const { result } = renderHook(() => useProductById(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockProduct);
    expect(mockedGetProductById).toHaveBeenCalledWith(1);
  });

  it("no debería ejecutar la query si el ID es 0", () => {
    renderHook(() => useProductById(0), {
      wrapper: createWrapper(),
    });

    expect(mockedGetProductById).not.toHaveBeenCalled();
  });

  it("no debería ejecutar la query si el ID es negativo", () => {
    renderHook(() => useProductById(-1), {
      wrapper: createWrapper(),
    });

    expect(mockedGetProductById).not.toHaveBeenCalled();
  });

  it("debería manejar errores correctamente", async () => {
    mockedGetProductById.mockRejectedValueOnce(new Error("Not found"));

    const { result } = renderHook(() => useProductById(999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
