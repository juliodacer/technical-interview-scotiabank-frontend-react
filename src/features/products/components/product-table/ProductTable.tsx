import { useNavigate } from "react-router";
import type { Product } from "../../interfaces/product.response";
import "./ProductTable.css";

interface ProductTableProps {
  products: Product[];
}

export const ProductTable = ({ products }: ProductTableProps) => {
  const navigate = useNavigate();

  const handleViewDetails = (productId: number) => {
    navigate(`/product/${productId}`);
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
                <button
                  onClick={() => handleViewDetails(product.id)}
                  className="btn-view-details"
                  aria-label={`Ver detalles de ${product.name}`}
                >
                  Ver detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
