import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { HomePage } from "../features/products/pages/home/HomePage";
import { ProductsLayout } from "../features/products/layouts/ProductsLayout";

const ProductDetailPage = lazy(
  () => import("../features/products/pages/product-detail/ProductDetailPage"),
);

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProductsLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
]);
