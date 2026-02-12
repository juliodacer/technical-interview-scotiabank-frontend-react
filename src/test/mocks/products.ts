import type { Product, ProductResponse } from "../../features/products/interfaces/product.response";
import type { Category } from "../../features/products/interfaces/category.response";

export const mockProduct: Product = {
  id: 1,
  code: "TCO001",
  name: "Tarjeta de Crédito Oro",
  description: "Programa de recompensas y seguros incluidos.",
  price: "150.00",
  reg_date: new Date("2024-01-15"),
  mod_date: null,
  state: true,
  category: "Tarjeta",
};

export const mockProducts: Product[] = [
  mockProduct,
  {
    id: 2,
    code: "CAD002",
    name: "Cuenta de Ahorro Digital",
    description: "Cuenta sin comisiones de mantenimiento.",
    price: "0.00",
    reg_date: new Date("2024-02-20"),
    mod_date: new Date("2024-06-10"),
    state: true,
    category: "Cuenta",
  },
  {
    id: 3,
    code: "CPE003",
    name: "Crédito Personal Express",
    description: "Crédito aprobado en 24 horas.",
    price: "500.00",
    reg_date: new Date("2024-03-10"),
    mod_date: null,
    state: false,
    category: "Crédito",
  },
];

export const mockProductResponse: ProductResponse = {
  products: mockProducts,
  total: 3,
  page: 1,
};

export const mockCategories: Category[] = [
  { id: 1, name: "Tarjeta" },
  { id: 2, name: "Crédito" },
  { id: 3, name: "Cuenta" },
];
