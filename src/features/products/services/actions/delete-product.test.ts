import { deleteProduct } from "./delete-product";
import { productApi } from "../api/productApi";

vi.mock("../api/productApi", () => ({
  productApi: {
    delete: vi.fn(),
  },
}));

const mockedApi = vi.mocked(productApi);

describe("deleteProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("VITE_API_URL", "http://localhost:3003/api");
  });

  it("debería eliminar un producto por su ID", async () => {
    mockedApi.delete.mockResolvedValueOnce({});

    await deleteProduct(10);

    expect(mockedApi.delete).toHaveBeenCalledWith(
      "http://localhost:3003/api/products/10",
    );
  });

  it("debería lanzar error cuando la eliminación falla", async () => {
    mockedApi.delete.mockRejectedValueOnce(new Error("Not found"));

    await expect(deleteProduct(999)).rejects.toThrow("Not found");
  });
});
