import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("debería renderizar el input con el placeholder", () => {
    render(<SearchBar placeholder="Buscar producto..." onQuery={vi.fn()} />);

    expect(
      screen.getByPlaceholderText("Buscar producto..."),
    ).toBeInTheDocument();
  });

  it("debería mostrar el valor externo cuando se proporciona", () => {
    render(
      <SearchBar placeholder="Buscar" value="oro" onQuery={vi.fn()} />,
    );

    expect(screen.getByDisplayValue("oro")).toBeInTheDocument();
  });

  it("debería llamar a onQuery con debounce al escribir", async () => {
    const user = userEvent.setup();
    const handleQuery = vi.fn();

    render(<SearchBar placeholder="Buscar" onQuery={handleQuery} />);

    await user.type(screen.getByPlaceholderText("Buscar"), "tarjeta");

    await waitFor(
      () => {
        expect(handleQuery).toHaveBeenCalledWith("tarjeta");
      },
      { timeout: 2000 },
    );
  });

  it("debería mostrar el botón de limpiar cuando hay texto", async () => {
    const user = userEvent.setup();

    render(<SearchBar placeholder="Buscar" onQuery={vi.fn()} />);

    expect(
      screen.queryByRole("button", { name: "Limpiar búsqueda" }),
    ).not.toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Buscar"), "test");

    expect(
      screen.getByRole("button", { name: "Limpiar búsqueda" }),
    ).toBeInTheDocument();
  });

  it("debería limpiar el texto al hacer clic en el botón de limpiar", async () => {
    const user = userEvent.setup();
    const handleQuery = vi.fn();

    render(<SearchBar placeholder="Buscar" onQuery={handleQuery} />);

    await user.type(screen.getByPlaceholderText("Buscar"), "test");

    await user.click(
      screen.getByRole("button", { name: "Limpiar búsqueda" }),
    );

    expect(screen.getByPlaceholderText("Buscar")).toHaveValue("");
    expect(handleQuery).toHaveBeenCalledWith("");
  });

  it("debería llamar a onQuery inmediatamente al presionar Enter", async () => {
    const user = userEvent.setup();
    const handleQuery = vi.fn();

    render(<SearchBar placeholder="Buscar" onQuery={handleQuery} />);

    const input = screen.getByPlaceholderText("Buscar");
    await user.type(input, "oro");

    handleQuery.mockClear();

    await user.keyboard("{Enter}");

    expect(handleQuery).toHaveBeenCalledWith("oro");
  });

  it("debería ocultar el botón de limpiar cuando no hay texto", () => {
    render(<SearchBar placeholder="Buscar" value="" onQuery={vi.fn()} />);

    expect(
      screen.queryByRole("button", { name: "Limpiar búsqueda" }),
    ).not.toBeInTheDocument();
  });
});
