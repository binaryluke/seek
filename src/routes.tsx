import { RouteObject } from "react-router-dom";
import { LoginRoute } from "./routes/LoginRoute";
import { CheckoutRoute } from "./routes/CheckoutRoute";
import { SuccessRoute } from "./routes/SuccessRoute";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginRoute />,
  },
  {
    path: "/checkout",
    element: <CheckoutRoute />,
  },
  {
    path: "/success",
    element: <SuccessRoute />,
  },
];
