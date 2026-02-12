import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toast } from "./Toast";

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("no debería renderizar nada cuando isVisible es false", () => {
    const { container } = render(
      <Toast message="Test" type="success" isVisible={false} onClose={vi.fn()} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("debería renderizar el mensaje cuando isVisible es true", () => {
    render(
      <Toast message="Producto creado" type="success" isVisible={true} onClose={vi.fn()} />,
    );

    expect(screen.getByText("Producto creado")).toBeInTheDocument();
  });

  it("debería aplicar la clase de tipo 'success'", () => {
    render(
      <Toast message="Éxito" type="success" isVisible={true} onClose={vi.fn()} />,
    );

    expect(screen.getByRole("alert")).toHaveClass("toast-success");
  });

  it("debería aplicar la clase de tipo 'error'", () => {
    render(
      <Toast message="Error" type="error" isVisible={true} onClose={vi.fn()} />,
    );

    expect(screen.getByRole("alert")).toHaveClass("toast-error");
  });

  it("debería cerrarse automáticamente después de la duración", () => {
    const handleClose = vi.fn();

    render(
      <Toast
        message="Test"
        type="success"
        isVisible={true}
        onClose={handleClose}
        duration={3000}
      />,
    );

    expect(handleClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("debería respetar una duración personalizada", () => {
    const handleClose = vi.fn();

    render(
      <Toast
        message="Test"
        type="success"
        isVisible={true}
        onClose={handleClose}
        duration={5000}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(handleClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("debería llamar a onClose al hacer clic en el botón de cerrar", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Toast
        message="Test"
        type="success"
        isVisible={true}
        onClose={handleClose}
        duration={0}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Cerrar notificación" }),
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("debería tener role='alert' para accesibilidad", () => {
    render(
      <Toast message="Test" type="success" isVisible={true} onClose={vi.fn()} />,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("debería tener aria-live='assertive'", () => {
    render(
      <Toast message="Test" type="success" isVisible={true} onClose={vi.fn()} />,
    );

    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
  });
});
