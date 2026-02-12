import { getProductsByQuery } from "./get-products-by-query";
import { productApi } from "../api/productApi";
import { mockProductResponse } from "../../../../test/mocks/products";

vi.mock("../api/productApi", () => ({
  productApi: {
    get: vi.fn(),
  },
}));

const mockedApi = vi.mocked(productApi);

describe("getProductsByQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("VITE_API_URL", "http://localhost:3003/api");
  });

  it("debería construir query params con valores por defecto", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockProductResponse });

    await getProductsByQuery();

    expect(mockedApi.get).toHaveBeenCalledWith(
      "http://localhost:3003/api/products",
      {
        params: { page: 1, size: 5 },
      },
    );
  });

  it("debería incluir parámetros de búsqueda cuando se proporcionan", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockProductResponse });

    await getProductsByQuery({
      page: 2,
      size: 10,
      q: "oro",
      category: "Tarjeta",
      state: true,
    });

    expect(mockedApi.get).toHaveBeenCalledWith(
      "http://localhost:3003/api/products",
      {
        params: {
          page: 2,
          size: 10,
          q: "oro",
          category: "Tarjeta",
          state: true,
        },
      },
    );
  });

  it("debería ignorar parámetro 'q' cuando está vacío", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockProductResponse });

    await getProductsByQuery({ q: "  " });

    expect(mockedApi.get).toHaveBeenCalledWith(
      "http://localhost:3003/api/products",
      {
        params: { page: 1, size: 5 },
      },
    );
  });

  it("debería ignorar parámetro 'category' cuando está vacío", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockProductResponse });

    await getProductsByQuery({ category: "" });

    expect(mockedApi.get).toHaveBeenCalledWith(
      "http://localhost:3003/api/products",
      {
        params: { page: 1, size: 5 },
      },
    );
  });

  it("debería incluir state=false cuando se especifica", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockProductResponse });

    await getProductsByQuery({ state: false });

    expect(mockedApi.get).toHaveBeenCalledWith(
      "http://localhost:3003/api/products",
      {
        params: { page: 1, size: 5, state: false },
      },
    );
  });

  it("debería retornar los datos de la respuesta", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockProductResponse });

    const result = await getProductsByQuery();

    expect(result).toEqual(mockProductResponse);
  });

  it("debería lanzar error cuando la API falla", async () => {
    mockedApi.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(getProductsByQuery()).rejects.toThrow("Network error");
  });

  it("debería hacer trim del texto de búsqueda", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockProductResponse });

    await getProductsByQuery({ q: "  oro  ", category: "  Tarjeta  " });

    expect(mockedApi.get).toHaveBeenCalledWith(
      "http://localhost:3003/api/products",
      {
        params: { page: 1, size: 5, q: "oro", category: "Tarjeta" },
      },
    );
  });
});
