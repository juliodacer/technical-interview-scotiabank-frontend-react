import type { Product } from "../../interfaces/product.response";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="product-card-header">
        <h3 className="product-card-title">{product.name}</h3>
        <span className="product-card-code">{product.code}</span>
      </div>

      <div className="product-card-body">
        <p className="product-card-description">{product.description}</p>

        <div className="product-card-info">
          <div className="product-card-info-item">
            <span className="product-card-label">Categoría</span>
            <span className="product-card-value">{product.category}</span>
          </div>

          <div className="product-card-info-item">
            <span className="product-card-label">Precio</span>
            <span className="product-card-value product-card-price">
              {product.price}
            </span>
          </div>
        </div>
      </div>

      <div className="product-card-footer">
        <span
          className={`product-card-status ${product.state ? "active" : "inactive"}`}
        >
          {product.state ? "Activo" : "Inactivo"}
        </span>
      </div>
    </div>
  );
};
