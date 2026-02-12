import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("debería renderizar el mensaje de error por defecto", () => {
    render(<ErrorState onRetry={vi.fn()} />);

    expect(
      screen.getByText("Ocurrió un error al cargar los datos"),
    ).toBeInTheDocument();
  });

  it("debería renderizar un mensaje personalizado", () => {
    render(
      <ErrorState
        message="Error al cargar productos"
        onRetry={vi.fn()}
      />,
    );

    expect(screen.getByText("Error al cargar productos")).toBeInTheDocument();
  });

  it("debería renderizar el botón de reintentar", () => {
    render(<ErrorState onRetry={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Reintentar carga" }),
    ).toBeInTheDocument();
  });

  it("debería llamar a onRetry al hacer clic en Reintentar", async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();

    render(<ErrorState onRetry={handleRetry} />);

    await user.click(screen.getByRole("button", { name: "Reintentar carga" }));

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it("debería renderizar botón secundario cuando se proporciona", () => {
    render(
      <ErrorState
        onRetry={vi.fn()}
        onSecondaryAction={vi.fn()}
        secondaryActionLabel="Ir al inicio"
      />,
    );

    expect(
      screen.getByRole("button", { name: "Ir al inicio" }),
    ).toBeInTheDocument();
  });

  it("no debería renderizar botón secundario cuando no se proporciona onSecondaryAction", () => {
    render(<ErrorState onRetry={vi.fn()} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
  });

  it("debería llamar a onSecondaryAction al hacer clic", async () => {
    const user = userEvent.setup();
    const handleSecondary = vi.fn();

    render(
      <ErrorState
        onRetry={vi.fn()}
        onSecondaryAction={handleSecondary}
        secondaryActionLabel="Volver"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Volver" }));

    expect(handleSecondary).toHaveBeenCalledTimes(1);
  });

  it("debería tener role='alert' para accesibilidad", () => {
    render(<ErrorState onRetry={vi.fn()} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
