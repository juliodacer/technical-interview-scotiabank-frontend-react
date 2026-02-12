import { getCategories } from "./get-categories";
import { productApi } from "../api/productApi";
import { mockCategories } from "../../../../test/mocks/products";

vi.mock("../api/productApi", () => ({
  productApi: {
    get: vi.fn(),
  },
}));

const mockedApi = vi.mocked(productApi);

describe("getCategories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("VITE_API_URL", "http://localhost:3003/api");
  });

  it("debería obtener las categorías desde la API", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockCategories });

    const result = await getCategories();

    expect(mockedApi.get).toHaveBeenCalledWith(
      "http://localhost:3003/api/categories",
    );
    expect(result).toEqual(mockCategories);
  });

  it("debería lanzar error cuando la API falla", async () => {
    mockedApi.get.mockRejectedValueOnce(new Error("Server error"));

    await expect(getCategories()).rejects.toThrow("Server error");
  });
});
