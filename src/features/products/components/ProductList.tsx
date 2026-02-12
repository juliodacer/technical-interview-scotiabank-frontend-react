import type { Product } from "../interfaces/product.response";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-list-item">
          <h3>{product.name}</h3>
          <p>{product.code}</p>
          <p>{product.category}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>{product.state}</p>
        </div>
      ))}
    </div>
  );
};
