import { useState } from "react";
import { CustomHeader } from "../../../../components/CustomHeader";
import { SearchBar } from "../../components/SearchBar";
import { getProductsByQuery } from "../../services/actions/get-products-by-query";
import type { Product } from "../../interfaces/product.response";
import { ProductList } from "../../components/ProductList";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = async (query: string = "") => {
    query = query.trim().toLowerCase();
    if (query.length === 0) return;
    const products = await getProductsByQuery();
    setProducts(products);
  };

  return (
    <>
      <CustomHeader
        title="Gestión de Productos Bancarios"
        subtitle="Encuentra los productos financieros que necesitas"
      />

      <SearchBar placeholder="Buscar producto" onQuery={handleSearch} />

      <ProductList products={products} />
    </>
  );
};
