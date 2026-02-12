import { render, screen } from "@testing-library/react";
import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
  it("debería renderizar con el mensaje por defecto", () => {
    render(<LoadingState />);

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("debería renderizar con un mensaje personalizado", () => {
    render(<LoadingState message="Cargando productos..." />);

    expect(screen.getByText("Cargando productos...")).toBeInTheDocument();
  });

  it("debería tener el role='status' para accesibilidad", () => {
    render(<LoadingState />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("debería aplicar el aria-label con el mensaje", () => {
    render(<LoadingState message="Procesando..." />);

    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Procesando...",
    );
  });

  it("debería aplicar la clase de tamaño correcta", () => {
    const { container } = render(<LoadingState size="large" />);

    expect(container.firstChild).toHaveClass("loading-state-large");
  });

  it("debería aplicar tamaño 'medium' por defecto", () => {
    const { container } = render(<LoadingState />);

    expect(container.firstChild).toHaveClass("loading-state-medium");
  });
});
