import { describe, expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { App } from "./App";
import { routes } from "./routes";

const setupRouter = (path: string) =>
  createMemoryRouter(
    [
      {
        path: "/",
        element: <App />,
        children: routes,
      },
    ],
    {
      initialEntries: [path],
    }
  );

const renderPath = (path: string) => {
  const router = setupRouter(path);
  return render(<RouterProvider router={router} />);
};

describe("App", () => {
  test("has the correct heading text", () => {
    const { getAllByRole } = renderPath("/");
    expect(
      getAllByRole("heading").some(
        (h) => h.textContent === "Seek | Luke Howard"
      )
    ).toBe(true);
  });

  test("home page should have Customer Login heading", () => {
    const { getAllByRole } = renderPath("/");
    expect(
      getAllByRole("heading").some((h) => h.textContent === "Customer Login")
    ).toBe(true);
  });

  test("checkout page should have Checkout heading", () => {
    const { getAllByRole } = renderPath("/checkout");
    expect(
      getAllByRole("heading").some((h) => h.textContent === "Checkout")
    ).toBe(true);
  });

  test("success page should have Success heading", () => {
    const { getAllByRole } = renderPath("/success");
    expect(
      getAllByRole("heading").some((h) => h.textContent === "Success")
    ).toBe(true);
  });
});
