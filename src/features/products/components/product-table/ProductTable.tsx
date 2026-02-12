import { useState } from "react";
import { useNavigate } from "react-router";
import type { Product } from "../../interfaces/product.response";
import { ConfirmDialog } from "../confirm-dialog/ConfirmDialog";
import { Toast } from "../toast/Toast";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import "./ProductTable.css";

interface ProductTableProps {
  products: Product[];
}

export const ProductTable = ({ products }: ProductTableProps) => {
  const navigate = useNavigate();
  const deleteMutation = useDeleteProduct();
  const [productToDelete, setProductToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const handleViewDetails = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete({ id: product.id, name: product.name });
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteMutation.mutate(productToDelete.id, {
        onSuccess: () => {
          setToast({
            message: "Producto eliminado exitosamente",
            type: "success",
            isVisible: true,
          });
          setProductToDelete(null);
        },
        onError: (error) => {
          setToast({
            message:
              error instanceof Error
                ? error.message
                : "Error al eliminar el producto",
            type: "error",
            isVisible: true,
          });
          setProductToDelete(null);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    if (!deleteMutation.isPending) {
      setProductToDelete(null);
    }
  };

  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <div className="product-table-container">
      <table className="product-table" role="table" aria-label="Tabla de productos bancarios">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Nombre</th>
            <th scope="col">Categoría</th>
            <th scope="col">Descripción</th>
            <th scope="col" className="text-right">Precio</th>
            <th scope="col" className="text-center">Estado</th>
            <th scope="col" className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="product-table-row">
              <td className="product-code">
                <data value={product.code}>{product.code}</data>
              </td>
              <td className="product-name">{product.name}</td>
              <td className="product-category">{product.category}</td>
              <td className="product-description">
                <span title={product.description}>
                  {truncateText(product.description)}
                </span>
              </td>
              <td className="product-price text-right">
                <data value={product.price}>{product.price}</data>
              </td>
              <td className="product-state text-center">
                <span
                  className={`status-badge ${product.state ? "status-active" : "status-inactive"}`}
                  aria-label={`Estado: ${product.state ? "Activo" : "Inactivo"}`}
                >
                  {product.state ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="product-actions text-center">
                <div className="product-actions-buttons">
                  <button
                    onClick={() => handleViewDetails(product.id)}
                    className="btn-view-details"
                    aria-label={`Ver detalles de ${product.name}`}
                  >
                    Ver detalle
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="btn-delete"
                    aria-label={`Eliminar ${product.name}`}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        isOpen={productToDelete !== null}
        title="Eliminar Producto"
        message={`¿Estás seguro de que deseas eliminar el producto "${productToDelete?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={deleteMutation.isPending}
        variant="danger"
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};
