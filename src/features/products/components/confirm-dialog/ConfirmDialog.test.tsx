import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmDialog } from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  const defaultProps = {
    isOpen: true,
    title: "Eliminar Producto",
    message: "¿Estás seguro de que deseas eliminar este producto?",
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("no debería renderizar nada cuando isOpen es false", () => {
    const { container } = render(
      <ConfirmDialog {...defaultProps} isOpen={false} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("debería renderizar el título y mensaje cuando está abierto", () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.getByText("Eliminar Producto")).toBeInTheDocument();
    expect(
      screen.getByText("¿Estás seguro de que deseas eliminar este producto?"),
    ).toBeInTheDocument();
  });

  it("debería renderizar botones con textos por defecto", () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.getByText("Confirmar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("debería renderizar botones con textos personalizados", () => {
    render(
      <ConfirmDialog
        {...defaultProps}
        confirmText="Eliminar"
        cancelText="No, conservar"
      />,
    );

    expect(screen.getByText("Eliminar")).toBeInTheDocument();
    expect(screen.getByText("No, conservar")).toBeInTheDocument();
  });

  it("debería llamar a onConfirm al hacer clic en confirmar", async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();

    render(<ConfirmDialog {...defaultProps} onConfirm={handleConfirm} />);

    await user.click(screen.getByText("Confirmar"));

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("debería llamar a onCancel al hacer clic en cancelar", async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(<ConfirmDialog {...defaultProps} onCancel={handleCancel} />);

    await user.click(screen.getByText("Cancelar"));

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("debería llamar a onCancel al hacer clic en el overlay", async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(<ConfirmDialog {...defaultProps} onCancel={handleCancel} />);

    const overlay = document.querySelector(".confirm-dialog-overlay");
    if (overlay) {
      await user.click(overlay);
    }

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("debería llamar a onCancel al presionar Escape", async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(<ConfirmDialog {...defaultProps} onCancel={handleCancel} />);

    await user.keyboard("{Escape}");

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("no debería llamar a onCancel al presionar Escape cuando isLoading", async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(
      <ConfirmDialog {...defaultProps} onCancel={handleCancel} isLoading={true} />,
    );

    await user.keyboard("{Escape}");

    expect(handleCancel).not.toHaveBeenCalled();
  });

  it("debería deshabilitar botones cuando isLoading es true", () => {
    render(<ConfirmDialog {...defaultProps} isLoading={true} />);

    expect(screen.getByText("Cancelar")).toBeDisabled();
    expect(screen.getByText("Procesando...")).toBeDisabled();
  });

  it("debería mostrar 'Procesando...' en el botón de confirmar cuando isLoading", () => {
    render(
      <ConfirmDialog {...defaultProps} isLoading={true} confirmText="Eliminar" />,
    );

    expect(screen.getByText("Procesando...")).toBeInTheDocument();
    expect(screen.queryByText("Eliminar")).not.toBeInTheDocument();
  });

  it("debería tener role='dialog' y aria-modal", () => {
    render(<ConfirmDialog {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("debería bloquear el scroll del body cuando está abierto", () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("debería restaurar el scroll del body cuando se cierra", () => {
    const { rerender } = render(<ConfirmDialog {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");

    rerender(<ConfirmDialog {...defaultProps} isOpen={false} />);

    expect(document.body.style.overflow).toBe("unset");
  });
});
