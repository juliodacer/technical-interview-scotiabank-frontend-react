import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { CustomHeader } from "../../../../components/CustomHeader";
import type { Product } from "../../interfaces/product.response";
import { useProductById } from "../../hooks/useProductById";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Product>>({});

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductById(Number(id));

  const formData = product ? { ...product, ...editedData } : null;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData((prev) => ({
      ...prev,
      state: e.target.checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setIsEditing(false);
    setEditedData({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({});
  };

  const handleBack = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <main className="product-detail-page">
        <div className="loading-container">
          <p className="loading-message">Cargando producto...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="product-detail-page">
        <div className="error-container">
          <p className="error-message">
            {error instanceof Error
              ? error.message
              : "Error al cargar el producto. Por favor, intenta nuevamente."}
          </p>
          <button onClick={handleBack} className="btn-back" type="button">
            ← Volver al listado
          </button>
        </div>
      </main>
    );
  }

  if (!formData) {
    return null;
  }

  return (
    <main className="product-detail-page">
      <CustomHeader
        title={isEditing ? "Editar Producto" : "Detalle del Producto"}
        subtitle={`Código: ${formData.code}`}
      />

      <article className="product-detail-container">
        <nav
          className="product-detail-actions"
          aria-label="Acciones del producto"
        >
          <button
            onClick={handleBack}
            className="btn-back"
            type="button"
            aria-label="Volver al listado de productos"
          >
            ← Volver
          </button>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-edit"
              type="button"
              aria-label="Editar información del producto"
            >
              Editar Producto
            </button>
          )}
        </nav>

        <form
          onSubmit={handleSubmit}
          className="product-detail-form"
          aria-label="Formulario de producto bancario"
          noValidate
        >
          <fieldset className="form-fieldset" disabled={!isEditing}>
            <legend className="form-legend">Información del Producto</legend>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="code" className="form-label">
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
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  aria-required="true"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name" className="form-label">
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
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  aria-required="true"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Categoría
                  <abbr title="requerido" aria-label="campo requerido">
                    *
                  </abbr>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  aria-required="true"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Cuentas">Cuentas</option>
                  <option value="Tarjetas">Tarjetas</option>
                  <option value="Préstamos">Préstamos</option>
                  <option value="Inversiones">Inversiones</option>
                  <option value="Seguros">Seguros</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price" className="form-label">
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
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  aria-required="true"
                  step="0.01"
                  min="0"
                  inputMode="decimal"
                />
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="description" className="form-label">
                  Descripción
                  <abbr title="requerido" aria-label="campo requerido">
                    *
                  </abbr>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows={4}
                  required
                  aria-required="true"
                  aria-describedby="description-help"
                />
                <small id="description-help" className="form-help">
                  Describe las características principales del producto bancario
                </small>
              </div>

              <div className="form-group form-group-checkbox">
                <label htmlFor="state" className="form-label-checkbox">
                  <input
                    type="checkbox"
                    id="state"
                    name="state"
                    checked={formData.state}
                    onChange={handleStateChange}
                    className="form-checkbox"
                    aria-describedby="state-help"
                  />
                  <span>Producto Activo</span>
                </label>
                <small id="state-help" className="form-help">
                  Indica si el producto está disponible para los clientes
                </small>
              </div>
            </div>
          </fieldset>

          {isEditing && (
            <div
              className="form-actions"
              role="group"
              aria-label="Acciones del formulario"
            >
              <button
                type="button"
                onClick={handleCancel}
                className="btn-cancel"
                aria-label="Cancelar edición y descartar cambios"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-submit"
                aria-label="Guardar cambios del producto"
              >
                Guardar Cambios
              </button>
            </div>
          )}
        </form>
      </article>
    </main>
  );
};

export default ProductDetailPage;
