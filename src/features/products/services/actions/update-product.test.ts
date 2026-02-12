import { updateProduct } from "./update-product";
import { productApi } from "../api/productApi";
import { mockProduct } from "../../../../test/mocks/products";
import type { UpdateProductRequest } from "../../interfaces/product-mutations";

vi.mock("../api/productApi", () => ({
  productApi: {
    patch: vi.fn(),
  },
}));

const mockedApi = vi.mocked(productApi);

describe("updateProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("VITE_API_URL", "http://localhost:3003/api");
  });

  it("debería actualizar un producto con PATCH al endpoint correcto", async () => {
    const updateData: UpdateProductRequest = {
      name: "Cuenta de Ahorro Digital",
    };

    mockedApi.patch.mockResolvedValueOnce({
      data: { ...mockProduct, name: "Cuenta de Ahorro Digital" },
    });

    const result = await updateProduct(1, updateData);

    expect(mockedApi.patch).toHaveBeenCalledWith(
      "http://localhost:3003/api/products/1",
      updateData,
    );
    expect(result.name).toBe("Cuenta de Ahorro Digital");
  });

  it("debería lanzar error cuando la actualización falla", async () => {
    mockedApi.patch.mockRejectedValueOnce(new Error("Server error"));

    await expect(updateProduct(1, { name: "Test" })).rejects.toThrow("Server error");
  });
});
