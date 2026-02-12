import { useState, useEffect } from "react";
import type { Category } from "../../interfaces/category.response";
import type {
  ProductFormData,
  FormErrors,
} from "../../interfaces/product-mutations";
import {
  validateProductForm,
  hasFormErrors,
} from "../../utils/validateProduct";
import "./ProductForm.css";

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  categories: Category[];
  isLoadingCategories?: boolean;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  mode: "create" | "edit";
}

export const ProductForm = ({
  initialData,
  categories,
  isLoadingCategories = false,
  onSubmit,
  onCancel,
  isSubmitting = false,
  mode,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    code: initialData?.code || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "0",
    categoryId: initialData?.categoryId || 0,
    state: initialData?.state !== undefined ? initialData.state : true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        code: initialData.code || "",
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "0",
        categoryId: initialData.categoryId || 0,
        state: initialData.state !== undefined ? initialData.state : true,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? parseInt(value, 10) : newValue,
    }));

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {},
    );
    setTouched(allTouched);

    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);

    if (!hasFormErrors(validationErrors)) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form" noValidate>
      <div className="product-form-grid">
        <div className="product-form-group">
          <label htmlFor="code" className="product-form-label">
            Código del Producto
            <abbr title="requerido" aria-label="campo requerido">
              *
            </abbr>
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`product-form-input ${touched.code && errors.code ? "product-form-input-error" : ""}`}
            disabled={isSubmitting || mode === "edit"}
            required
            aria-required="true"
            aria-invalid={touched.code && errors.code ? "true" : "false"}
            aria-describedby={
              touched.code && errors.code ? "code-error" : undefined
            }
          />
          {touched.code && errors.code && (
            <p id="code-error" className="product-form-error">
              {errors.code}
            </p>
          )}
        </div>

        <div className="product-form-group product-form-group-full">
          <label htmlFor="name" className="product-form-label">
            Nombre del Producto
            <abbr title="requerido" aria-label="campo requerido">
              *
            </abbr>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`product-form-input ${touched.name && errors.name ? "product-form-input-error" : ""}`}
            disabled={isSubmitting}
            required
            aria-required="true"
            aria-invalid={touched.name && errors.name ? "true" : "false"}
            aria-describedby={
              touched.name && errors.name ? "name-error" : undefined
            }
          />
          {touched.name && errors.name && (
            <p id="name-error" className="product-form-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="product-form-group">
          <label htmlFor="categoryId" className="product-form-label">
            Categoría
            <abbr title="requerido" aria-label="campo requerido">
              *
            </abbr>
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`product-form-input ${touched.categoryId && errors.categoryId ? "product-form-input-error" : ""}`}
            disabled={isSubmitting || isLoadingCategories}
            required
            aria-required="true"
            aria-invalid={
              touched.categoryId && errors.categoryId ? "true" : "false"
            }
            aria-describedby={
              touched.categoryId && errors.categoryId
                ? "categoryId-error"
                : undefined
            }
          >
            <option value="0">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {touched.categoryId && errors.categoryId && (
            <p id="categoryId-error" className="product-form-error">
              {errors.categoryId}
            </p>
          )}
        </div>

        <div className="product-form-group">
          <label htmlFor="price" className="product-form-label">
            Precio
            <abbr title="requerido" aria-label="campo requerido">
              *
            </abbr>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`product-form-input ${touched.price && errors.price ? "product-form-input-error" : ""}`}
            disabled={isSubmitting}
            required
            aria-required="true"
            step="0.01"
            min="0"
            aria-invalid={touched.price && errors.price ? "true" : "false"}
            aria-describedby={
              touched.price && errors.price ? "price-error" : undefined
            }
          />
          {touched.price && errors.price && (
            <p id="price-error" className="product-form-error">
              {errors.price}
            </p>
          )}
        </div>

        <div className="product-form-group product-form-group-full">
          <label htmlFor="description" className="product-form-label">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className="product-form-textarea"
            disabled={isSubmitting}
            rows={3}
          />
        </div>

        <div className="product-form-group product-form-group-checkbox">
          <label htmlFor="state" className="product-form-label-checkbox">
            <input
              type="checkbox"
              id="state"
              name="state"
              checked={formData.state}
              onChange={handleChange}
              className="product-form-checkbox"
              disabled={isSubmitting}
            />
            <span>Producto Activo</span>
          </label>
        </div>
      </div>

      <div className="product-form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="product-form-button product-form-button-cancel"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="product-form-button product-form-button-submit"
          disabled={isSubmitting || isLoadingCategories}
        >
          {isSubmitting
            ? "Guardando..."
            : mode === "create"
              ? "Crear Producto"
              : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
};
