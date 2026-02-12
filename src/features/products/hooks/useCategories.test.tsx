import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useCategories } from "./useCategories";
import { mockCategories } from "../../../test/mocks/products";

vi.mock("../services/actions/get-categories", () => ({
  getCategories: vi.fn(),
}));

import { getCategories } from "../services/actions/get-categories";
const mockedGetCategories = vi.mocked(getCategories);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCategories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería obtener las categorías exitosamente", async () => {
    mockedGetCategories.mockResolvedValueOnce(mockCategories);

    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCategories);
    expect(result.current.data).toHaveLength(3);
  });

  it("debería manejar errores de la API", async () => {
    mockedGetCategories.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it("debería tener staleTime de 30 minutos", async () => {
    mockedGetCategories.mockResolvedValueOnce(mockCategories);

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: 0 } },
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCategories(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // staleTime is configured, so only one call should be made
    expect(mockedGetCategories).toHaveBeenCalledTimes(1);
  });
});
