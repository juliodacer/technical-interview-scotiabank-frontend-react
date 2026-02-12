import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CustomHeader } from "../../../../components/CustomHeader";
import { LoadingState, ErrorState } from "../../components/ui-states";
import { Toast } from "../../components/toast/Toast";
import type { Product } from "../../interfaces/product.response";
import { useProductById } from "../../hooks/useProductById";
import { useCategories } from "../../hooks/useCategories";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Product>>({});
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductById(Number(id));

  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const updateMutation = useUpdateProduct();

  const formData = product ? { ...product, ...editedData } : null;

  const formatDate = (
    date: Date | null | undefined,
    isModDate = false,
  ): string => {
    if (!date) {
      return isModDate ? "No se realizó ninguna modificación" : "N/A";
    }

    try {
      const dateObj = typeof date === "string" ? parseISO(date) : date;
      return format(dateObj, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
    } catch {
      return isModDate ? "No se realizó ninguna modificación" : "N/A";
    }
  };

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
    
    if (!formData || !id) return;

    const categoryId = categories?.find(
      (cat) => cat.name === formData.category
    )?.id;

    if (!categoryId) {
      setToast({
        message: "Error: Categoría no válida",
        type: "error",
        isVisible: true,
      });
      return;
    }

    const updateData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      categoryId: categoryId,
      state: formData.state,
      code: formData.code,
    };

    updateMutation.mutate(
      { id: Number(id), data: updateData },
      {
        onSuccess: () => {
          setToast({
            message: "Producto actualizado exitosamente",
            type: "success",
            isVisible: true,
          });
          setIsEditing(false);
          setEditedData({});
        },
        onError: (error) => {
          setToast({
            message:
              error instanceof Error
                ? error.message
                : "Error al actualizar el producto",
            type: "error",
            isVisible: true,
          });
        },
      }
    );
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
        <LoadingState message="Cargando producto..." />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="product-detail-page">
        <ErrorState
          message={
            error instanceof Error
              ? error.message
              : "Error al cargar el producto. Por favor, intenta nuevamente."
          }
          onRetry={refetch}
          onSecondaryAction={handleBack}
          secondaryActionLabel="Volver al listado"
        />
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
          <fieldset className="form-fieldset">
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
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group form-group-full">
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
                  disabled={!isEditing}
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
                  disabled={!isEditing || isLoadingCategories}
                >
                  <option value="">Seleccionar categoría</option>
                  {isLoadingCategories ? (
                    <option disabled>Cargando categorías...</option>
                  ) : (
                    categories?.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))
                  )}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                />
                <small id="description-help" className="form-help">
                  Describe las características principales del producto bancario
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="reg_date" className="form-label">
                  Fecha de Registro
                </label>
                <input
                  type="text"
                  id="reg_date"
                  name="reg_date"
                  value={formatDate(formData.reg_date)}
                  className="form-input form-input-readonly"
                  readOnly
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="mod_date" className="form-label">
                  Última Modificación
                </label>
                <input
                  type="text"
                  id="mod_date"
                  name="mod_date"
                  value={formatDate(formData.mod_date, true)}
                  className="form-input form-input-readonly"
                  readOnly
                  disabled
                />
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
                    disabled={!isEditing}
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
                disabled={updateMutation.isPending}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-submit"
                aria-label="Guardar cambios del producto"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          )}
        </form>
      </article>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </main>
  );
};

export default ProductDetailPage;
