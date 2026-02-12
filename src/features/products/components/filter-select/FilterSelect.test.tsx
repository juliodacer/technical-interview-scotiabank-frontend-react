import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterSelect } from "./FilterSelect";

const defaultOptions = [
  { value: "tarjeta", label: "Tarjeta" },
  { value: "credito", label: "Crédito" },
  { value: "cuenta", label: "Cuenta" },
];

describe("FilterSelect", () => {
  it("debería renderizar con el placeholder", () => {
    render(
      <FilterSelect
        id="test"
        value=""
        options={defaultOptions}
        placeholder="Todas las categorías"
        onChange={vi.fn()}
        ariaLabel="Filtrar por categoría"
      />,
    );

    expect(screen.getByDisplayValue("Todas las categorías")).toBeInTheDocument();
  });

  it("debería renderizar todas las opciones", () => {
    render(
      <FilterSelect
        id="test"
        value=""
        options={defaultOptions}
        placeholder="Seleccionar"
        onChange={vi.fn()}
        ariaLabel="Test"
      />,
    );

    const options = screen.getAllByRole("option");
    // placeholder + 3 options
    expect(options).toHaveLength(4);
  });

  it("debería llamar a onChange al seleccionar una opción", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FilterSelect
        id="test"
        value=""
        options={defaultOptions}
        placeholder="Seleccionar"
        onChange={handleChange}
        ariaLabel="Test"
      />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "tarjeta");

    expect(handleChange).toHaveBeenCalledWith("tarjeta");
  });

  it("debería mostrar texto de carga cuando isLoading es true", () => {
    render(
      <FilterSelect
        id="test"
        value=""
        options={defaultOptions}
        placeholder="Seleccionar"
        onChange={vi.fn()}
        ariaLabel="Test"
        isLoading={true}
        loadingText="Cargando categorías..."
      />,
    );

    expect(screen.getByDisplayValue("Cargando categorías...")).toBeInTheDocument();
  });

  it("debería deshabilitar el select cuando isLoading es true", () => {
    render(
      <FilterSelect
        id="test"
        value=""
        options={defaultOptions}
        placeholder="Seleccionar"
        onChange={vi.fn()}
        ariaLabel="Test"
        isLoading={true}
      />,
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("debería deshabilitar el select cuando disabled es true", () => {
    render(
      <FilterSelect
        id="test"
        value=""
        options={defaultOptions}
        placeholder="Seleccionar"
        onChange={vi.fn()}
        ariaLabel="Test"
        disabled={true}
      />,
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("no debería renderizar opciones cuando está cargando", () => {
    render(
      <FilterSelect
        id="test"
        value=""
        options={defaultOptions}
        placeholder="Seleccionar"
        onChange={vi.fn()}
        ariaLabel="Test"
        isLoading={true}
      />,
    );

    const options = screen.getAllByRole("option");
    // Only placeholder option
    expect(options).toHaveLength(1);
  });

  it("debería tener el aria-label correcto", () => {
    render(
      <FilterSelect
        id="category"
        value=""
        options={defaultOptions}
        placeholder="Categoría"
        onChange={vi.fn()}
        ariaLabel="Filtrar por categoría"
      />,
    );

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-label",
      "Filtrar por categoría",
    );
  });

  it("debería tener aria-busy cuando está cargando", () => {
    render(
      <FilterSelect
        id="test"
        value=""
        options={[]}
        placeholder="Test"
        onChange={vi.fn()}
        ariaLabel="Test"
        isLoading={true}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveAttribute("aria-busy", "true");
  });
});
