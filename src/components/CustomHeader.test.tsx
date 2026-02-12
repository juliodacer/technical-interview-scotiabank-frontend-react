import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
  it("debería renderizar el título correctamente", () => {
    render(<CustomHeader title="Productos Bancarios" subtitle="" />);

    expect(
      screen.getByRole("heading", { name: "Productos Bancarios" }),
    ).toBeInTheDocument();
  });

  it("debería renderizar el subtítulo cuando se proporciona", () => {
    render(
      <CustomHeader
        title="Productos"
        subtitle="Encuentra los productos financieros"
      />,
    );

    expect(
      screen.getByText("Encuentra los productos financieros"),
    ).toBeInTheDocument();
  });

  it("no debería renderizar el subtítulo cuando está vacío", () => {
    render(<CustomHeader title="Productos" subtitle="" />);

    const paragraphs = document.querySelectorAll("header p");
    expect(paragraphs).toHaveLength(0);
  });

  it("debería usar el elemento semántico <header>", () => {
    render(<CustomHeader title="Test" subtitle="Sub" />);

    expect(document.querySelector("header")).toBeInTheDocument();
  });
});
