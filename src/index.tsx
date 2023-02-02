import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { routes } from "./routes";
import { AuthProvider } from "./providers/AuthProvider";
import { CartProvider } from "./providers/CartProvider";

const WrappedApp = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <WrappedApp />,
      children: routes,
    },
  ],
  {
    basename: process.env.URI_BASENAME,
  }
);
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<RouterProvider router={router} />);
