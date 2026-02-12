import { createProduct } from "./create-product";
import { productApi } from "../api/productApi";
import { mockProduct } from "../../../../test/mocks/products";
import type { CreateProductRequest } from "../../interfaces/product-mutations";

vi.mock("../api/productApi", () => ({
  productApi: {
    post: vi.fn(),
  },
}));

const mockedApi = vi.mocked(productApi);

describe("createProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("VITE_API_URL", "http://localhost:3003/api");
  });

  it("debería crear un producto enviando datos al endpoint correcto", async () => {
    const requestData: CreateProductRequest = {
      code: "TCO007",
      name: "Tarjeta de Crédito Oro",
      description: "Programa de recompensas.",
      price: 0.0,
      categoryId: 1,
    };

    mockedApi.post.mockResolvedValueOnce({ data: mockProduct });

    const result = await createProduct(requestData);

    expect(mockedApi.post).toHaveBeenCalledWith(
      "http://localhost:3003/api/products",
      requestData,
    );
    expect(result).toEqual(mockProduct);
  });

  it("debería lanzar error cuando la creación falla", async () => {
    const requestData: CreateProductRequest = {
      code: "TCO007",
      name: "Test",
      description: "",
      price: 0,
      categoryId: 1,
    };

    mockedApi.post.mockRejectedValueOnce(new Error("Validation error"));

    await expect(createProduct(requestData)).rejects.toThrow("Validation error");
  });
});
