import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalItems: 30,
    itemsPerPage: 6,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("información de paginación", () => {
    it("debería mostrar el rango de elementos correcto", () => {
      render(<Pagination {...defaultProps} />);

      expect(screen.getByText(/Mostrando 1-6 de 30 productos/)).toBeInTheDocument();
    });

    it("debería mostrar 'producto' en singular cuando solo hay 1", () => {
      render(<Pagination {...defaultProps} totalItems={1} />);

      expect(screen.getByText(/1 producto$/)).toBeInTheDocument();
    });

    it("debería mostrar 'productos' en plural cuando hay más de 1", () => {
      render(<Pagination {...defaultProps} totalItems={5} />);

      expect(screen.getByText(/5 productos/)).toBeInTheDocument();
    });

    it("debería calcular correctamente el rango en la última página", () => {
      render(<Pagination {...defaultProps} currentPage={5} />);

      expect(screen.getByText(/Mostrando 25-30 de 30 productos/)).toBeInTheDocument();
    });

    it("debería ajustar endItem cuando la última página no está completa", () => {
      render(<Pagination {...defaultProps} totalItems={32} currentPage={6} />);

      expect(screen.getByText(/Mostrando 31-32 de 32 productos/)).toBeInTheDocument();
    });
  });

  describe("botones de navegación", () => {
    it("debería deshabilitar 'Anterior' en la primera página", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);

      expect(
        screen.getByRole("button", { name: "Página anterior" }),
      ).toBeDisabled();
    });

    it("debería habilitar 'Anterior' cuando no es la primera página", () => {
      render(<Pagination {...defaultProps} currentPage={3} />);

      expect(
        screen.getByRole("button", { name: "Página anterior" }),
      ).not.toBeDisabled();
    });

    it("debería deshabilitar 'Siguiente' en la última página", () => {
      render(<Pagination {...defaultProps} currentPage={5} />);

      expect(
        screen.getByRole("button", { name: "Página siguiente" }),
      ).toBeDisabled();
    });

    it("debería habilitar 'Siguiente' cuando no es la última página", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);

      expect(
        screen.getByRole("button", { name: "Página siguiente" }),
      ).not.toBeDisabled();
    });

    it("debería llamar a onPageChange con página anterior", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination {...defaultProps} currentPage={3} onPageChange={handlePageChange} />,
      );

      await user.click(screen.getByRole("button", { name: "Página anterior" }));

      expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it("debería llamar a onPageChange con página siguiente", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination {...defaultProps} currentPage={2} onPageChange={handlePageChange} />,
      );

      await user.click(screen.getByRole("button", { name: "Página siguiente" }));

      expect(handlePageChange).toHaveBeenCalledWith(3);
    });
  });

  describe("números de página", () => {
    it("debería mostrar todas las páginas cuando hay 6 o menos", () => {
      render(<Pagination {...defaultProps} totalItems={18} />);

      expect(screen.getByRole("button", { name: "Ir a página 1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Ir a página 2" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Ir a página 3" })).toBeInTheDocument();
    });

    it("debería marcar la página actual como activa", () => {
      render(<Pagination {...defaultProps} currentPage={2} />);

      const activeButton = screen.getByRole("button", { name: "Ir a página 2" });
      expect(activeButton).toHaveClass("pagination-number-active");
      expect(activeButton).toHaveAttribute("aria-current", "page");
    });

    it("debería llamar a onPageChange al hacer clic en un número de página", async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Pagination {...defaultProps} onPageChange={handlePageChange} />,
      );

      await user.click(screen.getByRole("button", { name: "Ir a página 3" }));

      expect(handlePageChange).toHaveBeenCalledWith(3);
    });

    it("debería mostrar ellipsis cuando hay muchas páginas", () => {
      render(
        <Pagination
          {...defaultProps}
          totalItems={60}
          currentPage={5}
        />,
      );

      const ellipsis = screen.getAllByText("...");
      expect(ellipsis.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("accesibilidad", () => {
    it("debería tener un nav con aria-label", () => {
      render(<Pagination {...defaultProps} />);

      expect(
        screen.getByRole("navigation", { name: "Navegación de páginas" }),
      ).toBeInTheDocument();
    });
  });
});
