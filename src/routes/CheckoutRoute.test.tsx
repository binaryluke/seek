import { describe, expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CheckoutRoute } from "./CheckoutRoute";

const renderWithRouter = (props: object) => {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <CheckoutRoute {...props} />
    </MemoryRouter>
  );
};

describe("CheckoutRoute", () => {
  test("has an initial total of $0", () => {
    const { getByText } = renderWithRouter({});
    getByText("Total: $0");
  });
});
