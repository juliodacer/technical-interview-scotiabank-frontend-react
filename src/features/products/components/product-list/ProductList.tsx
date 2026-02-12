import type { Product } from "../../interfaces/product.response";
import { ProductCard } from "../product-card/ProductCard";
import "./ProductList.css";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
