import { useNavigate } from "react-router";
import type { Product } from "../../interfaces/product.response";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className="product-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalles de ${product.name}`}
    >
      <header className="product-card-header">
        <h3 className="product-card-title">{product.name}</h3>
        <data className="product-card-code" value={product.code}>
          {product.code}
        </data>
      </header>

      <section className="product-card-body">
        <p className="product-card-description">{product.description}</p>

        <dl className="product-card-info">
          <div className="product-card-info-item">
            <dt className="product-card-label">Categoría</dt>
            <dd className="product-card-value">{product.category}</dd>
          </div>

          <div className="product-card-info-item">
            <dt className="product-card-label">Precio</dt>
            <dd className="product-card-value product-card-price">
              <data value={product.price}>{product.price}</data>
            </dd>
          </div>
        </dl>
      </section>

      <footer className="product-card-footer">
        <span
          className={`product-card-status ${product.state ? "active" : "inactive"}`}
          aria-label={`Estado del producto: ${product.state ? "Activo" : "Inactivo"}`}
        >
          {product.state ? "Activo" : "Inactivo"}
        </span>
      </footer>
    </article>
  );
};
