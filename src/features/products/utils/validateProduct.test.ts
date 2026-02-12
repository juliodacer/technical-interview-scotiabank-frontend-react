import { validateProductForm, hasFormErrors } from "./validateProduct";
import type { ProductFormData, FormErrors } from "../interfaces/product-mutations";

describe("validateProductForm", () => {
  const buildValidFormData = (overrides?: Partial<ProductFormData>): ProductFormData => ({
    code: "TCO001",
    name: "Tarjeta de Crédito Oro",
    description: "Descripción del producto",
    price: "150.00",
    categoryId: 1,
    state: true,
    ...overrides,
  });

  it("debería retornar un objeto vacío cuando los datos son válidos", () => {
    const errors = validateProductForm(buildValidFormData());

    expect(errors).toEqual({});
  });

  describe("validación del nombre", () => {
    it("debería retornar error cuando el nombre está vacío", () => {
      const errors = validateProductForm(buildValidFormData({ name: "" }));

      expect(errors.name).toBe("El nombre es requerido (mínimo 3 caracteres)");
    });

    it("debería retornar error cuando el nombre tiene menos de 3 caracteres", () => {
      const errors = validateProductForm(buildValidFormData({ name: "AB" }));

      expect(errors.name).toBe("El nombre es requerido (mínimo 3 caracteres)");
    });

    it("debería aceptar un nombre con exactamente 3 caracteres", () => {
      const errors = validateProductForm(buildValidFormData({ name: "Oro" }));

      expect(errors.name).toBeUndefined();
    });

    it("debería retornar error cuando el nombre solo contiene espacios", () => {
      const errors = validateProductForm(buildValidFormData({ name: "  " }));

      expect(errors.name).toBe("El nombre es requerido (mínimo 3 caracteres)");
    });
  });

  describe("validación del código", () => {
    it("debería retornar error cuando el código está vacío", () => {
      const errors = validateProductForm(buildValidFormData({ code: "" }));

      expect(errors.code).toBe("El código es requerido");
    });

    it("debería retornar error cuando el código solo contiene espacios", () => {
      const errors = validateProductForm(buildValidFormData({ code: "   " }));

      expect(errors.code).toBe("El código es requerido");
    });

    it("debería aceptar un código válido", () => {
      const errors = validateProductForm(buildValidFormData({ code: "TCO007" }));

      expect(errors.code).toBeUndefined();
    });
  });

  describe("validación del precio", () => {
    it("debería retornar error cuando el precio es negativo", () => {
      const errors = validateProductForm(buildValidFormData({ price: "-10" }));

      expect(errors.price).toBe("El precio debe ser mayor o igual a 0");
    });

    it("debería retornar error cuando el precio no es un número", () => {
      const errors = validateProductForm(buildValidFormData({ price: "abc" }));

      expect(errors.price).toBe("El precio debe ser mayor o igual a 0");
    });

    it("debería retornar error cuando el precio está vacío", () => {
      const errors = validateProductForm(buildValidFormData({ price: "" }));

      expect(errors.price).toBe("El precio debe ser mayor o igual a 0");
    });

    it("debería aceptar un precio igual a 0", () => {
      const errors = validateProductForm(buildValidFormData({ price: "0" }));

      expect(errors.price).toBeUndefined();
    });

    it("debería aceptar un precio positivo con decimales", () => {
      const errors = validateProductForm(buildValidFormData({ price: "99.99" }));

      expect(errors.price).toBeUndefined();
    });
  });

  describe("validación de categoría", () => {
    it("debería retornar error cuando la categoría es 0", () => {
      const errors = validateProductForm(buildValidFormData({ categoryId: 0 }));

      expect(errors.categoryId).toBe("La categoría es requerida");
    });

    it("debería aceptar una categoría válida", () => {
      const errors = validateProductForm(buildValidFormData({ categoryId: 2 }));

      expect(errors.categoryId).toBeUndefined();
    });
  });

  describe("múltiples errores simultáneos", () => {
    it("debería retornar todos los errores cuando todos los campos son inválidos", () => {
      const errors = validateProductForm({
        code: "",
        name: "",
        description: "",
        price: "abc",
        categoryId: 0,
        state: true,
      });

      expect(errors.code).toBeDefined();
      expect(errors.name).toBeDefined();
      expect(errors.price).toBeDefined();
      expect(errors.categoryId).toBeDefined();
    });
  });
});

describe("hasFormErrors", () => {
  it("debería retornar false cuando no hay errores", () => {
    const errors: FormErrors = {};

    expect(hasFormErrors(errors)).toBe(false);
  });

  it("debería retornar true cuando hay al menos un error", () => {
    const errors: FormErrors = { name: "Error de nombre" };

    expect(hasFormErrors(errors)).toBe(true);
  });

  it("debería retornar true cuando hay múltiples errores", () => {
    const errors: FormErrors = {
      name: "Error",
      code: "Error",
      price: "Error",
    };

    expect(hasFormErrors(errors)).toBe(true);
  });
});
