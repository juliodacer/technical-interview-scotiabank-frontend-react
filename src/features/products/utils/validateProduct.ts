import type { ProductFormData, FormErrors } from "../interfaces/product-mutations";

export const validateProductForm = (data: ProductFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = "El nombre es requerido (mínimo 3 caracteres)";
  }

  if (!data.code || data.code.trim().length === 0) {
    errors.code = "El código es requerido";
  }

  const price = parseFloat(data.price);
  if (isNaN(price) || price < 0) {
    errors.price = "El precio debe ser mayor o igual a 0";
  }

  if (!data.categoryId || data.categoryId === 0) {
    errors.categoryId = "La categoría es requerida";
  }

  return errors;
};

export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
