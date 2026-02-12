import { useEffect, useState } from "react";
import { ProductForm } from "../product-form/ProductForm";
import { Toast } from "../toast/Toast";
import { useCategories } from "../../hooks/useCategories";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import type { ProductFormData } from "../../interfaces/product-mutations";
import "./ProductModal.css";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create";
}

export const ProductModal = ({ isOpen, onClose, mode }: ProductModalProps) => {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const createMutation = useCreateProduct();
  
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !createMutation.isPending) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, createMutation.isPending, onClose]);

  const handleSubmit = (data: ProductFormData) => {
    const requestData = {
      code: data.code,
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      categoryId: data.categoryId,
      state: data.state,
    };

    createMutation.mutate(requestData, {
      onSuccess: () => {
        setToast({
          message: "Producto creado exitosamente",
          type: "success",
          isVisible: true,
        });
        setTimeout(() => {
          onClose();
        }, 1000);
      },
      onError: (error) => {
        setToast({
          message: error instanceof Error ? error.message : "Error al crear el producto",
          type: "error",
          isVisible: true,
        });
      },
    });
  };

  const handleCancel = () => {
    if (!createMutation.isPending) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="product-modal-overlay"
        onClick={!createMutation.isPending ? handleCancel : undefined}
      >
        <div
          className="product-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="product-modal-header">
            <h2 id="modal-title" className="product-modal-title">
              {mode === "create" ? "Crear Nuevo Producto" : "Editar Producto"}
            </h2>
            {!createMutation.isPending && (
              <button
                onClick={handleCancel}
                className="product-modal-close"
                aria-label="Cerrar modal"
                type="button"
              >
                ✕
              </button>
            )}
          </div>

          <div className="product-modal-body">
            <ProductForm
              categories={categories || []}
              isLoadingCategories={isLoadingCategories}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isSubmitting={createMutation.isPending}
              mode={mode}
            />
          </div>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </>
  );
};
