import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";

export const ProductsApp = () => {
  return <RouterProvider router={appRouter} />;
};
