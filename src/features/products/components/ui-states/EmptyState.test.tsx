import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("debería renderizar el mensaje por defecto", () => {
    render(<EmptyState />);

    expect(
      screen.getByText("No se encontraron resultados"),
    ).toBeInTheDocument();
  });

  it("debería renderizar un mensaje personalizado", () => {
    render(<EmptyState message="No hay productos disponibles" />);

    expect(
      screen.getByText("No hay productos disponibles"),
    ).toBeInTheDocument();
  });

  it("debería renderizar la descripción cuando se proporciona", () => {
    render(<EmptyState description="Intenta ajustar los filtros" />);

    expect(
      screen.getByText("Intenta ajustar los filtros"),
    ).toBeInTheDocument();
  });

  it("no debería renderizar la descripción cuando no se proporciona", () => {
    render(<EmptyState />);

    expect(
      screen.queryByText("Intenta ajustar los filtros"),
    ).not.toBeInTheDocument();
  });

  it("debería renderizar el botón de acción cuando se proporcionan ambos props", () => {
    const handleAction = vi.fn();

    render(
      <EmptyState
        actionLabel="Limpiar filtros"
        onAction={handleAction}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Limpiar filtros" }),
    ).toBeInTheDocument();
  });

  it("no debería renderizar el botón si falta onAction", () => {
    render(<EmptyState actionLabel="Limpiar filtros" />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("no debería renderizar el botón si falta actionLabel", () => {
    render(<EmptyState onAction={vi.fn()} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("debería llamar a onAction al hacer clic en el botón", async () => {
    const user = userEvent.setup();
    const handleAction = vi.fn();

    render(
      <EmptyState
        actionLabel="Limpiar filtros"
        onAction={handleAction}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Limpiar filtros" }));

    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it("debería tener role='status' para accesibilidad", () => {
    render(<EmptyState />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
