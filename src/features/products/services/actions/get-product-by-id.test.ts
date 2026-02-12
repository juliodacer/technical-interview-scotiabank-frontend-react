import { getProductById } from "./get-product-by-id";
import { productApi } from "../api/productApi";
import { mockProduct } from "../../../../test/mocks/products";

vi.mock("../api/productApi", () => ({
  productApi: {
    get: vi.fn(),
  },
}));

const mockedApi = vi.mocked(productApi);

describe("getProductById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("VITE_API_URL", "http://localhost:3003/api");
  });

  it("debería obtener un producto por su ID", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockProduct });

    const result = await getProductById(1);

    expect(mockedApi.get).toHaveBeenCalledWith(
      "http://localhost:3003/api/products/1",
    );
    expect(result).toEqual(mockProduct);
  });

  it("debería lanzar error cuando el producto no existe", async () => {
    mockedApi.get.mockRejectedValueOnce(new Error("Not found"));

    await expect(getProductById(999)).rejects.toThrow("Not found");
  });
});
