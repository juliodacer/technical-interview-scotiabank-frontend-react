import { CustomHeader } from "../../../../components/CustomHeader";
import { SearchBar } from "../../components/SearchBar";

export const HomePage = () => {
  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <>
      <CustomHeader
        title="Gestión de Productos Bancarios"
        subtitle="Encuentra los productos financieros que necesitas"
      />

      <SearchBar placeholder="Buscar producto" onQuery={handleSearch} />
    </>
  );
};
