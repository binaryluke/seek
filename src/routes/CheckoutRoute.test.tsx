import { describe, expect, test, afterEach } from "@jest/globals";
import {
  render,
  waitFor,
  within,
  fireEvent,
  act,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CheckoutRoute } from "./CheckoutRoute";
import { emptyAllCarts } from "../server/mockServer";

const CLASSIC_PRODUCT_ID = 0;
const STANDOUT_PRODUCT_ID = 1;
const PREMIUM_PRODUCT_ID = 2;

const renderWithRouter = (props: object) => {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <CheckoutRoute {...props} />
    </MemoryRouter>
  );
};

afterEach(async () => {
  await emptyAllCarts();
});

describe.skip("CheckoutRoute", () => {
  test.skip("Example scenario 1 (Default)", async () => {
    const { getByTestId, findByTestId } = renderWithRouter({});

    await waitFor(() =>
      expect(getByTestId("checkoutTotalPrice").textContent).toEqual("$0")
    );
    await waitFor(() => {
      expect(within(getByTestId("checkoutCartItems")).findByText("Classic Ad"));
      expect(
        within(getByTestId("checkoutCartItems")).findByText("Stand out Ad")
      );
      expect(within(getByTestId("checkoutCartItems")).findByText("Premium Ad"));
    });

    const classicItem = await findByTestId(
      `checkoutProductId-${CLASSIC_PRODUCT_ID}`
    );
    const standoutItem = await findByTestId(
      `standoutProductId-${STANDOUT_PRODUCT_ID}`
    );
    const premiumItem = await findByTestId(
      `premiumProductId-${PREMIUM_PRODUCT_ID}`
    );

    act(() =>
      fireEvent.click(within(classicItem).getByTestId("cartItemIncreaseQtyBtn"))
    );
    act(() =>
      fireEvent.click(
        within(standoutItem).getByTestId("cartItemIncreaseQtyBtn")
      )
    );
    act(() =>
      fireEvent.click(within(premiumItem).getByTestId("cartItemIncreaseQtyBtn"))
    );
  });

  test.skip("Example scenario 2 (SecondBite)", async () => {});
  test.skip("Example scenario 3 (Axil)", async () => {});
});
