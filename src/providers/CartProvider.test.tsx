import { describe, expect, test, afterEach } from "@jest/globals";
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  CartProvider,
  useCartProducts,
  useTotalPrice,
  useAddToCart,
} from "./CartProvider";
import { emptyAllCarts } from "../server/mockServer";

const DEFAULT_USER_ID = 0;
const SECONDBITE_USER_ID = 1;
const AXIL_USER_ID = 2;

const CLASSIC_PRODUCT_ID = 0;
const STANDOUT_PRODUCT_ID = 1;
const PREMIUM_PRODUCT_ID = 2;

const TestingComponent = () => {
  const cartProducts = useCartProducts();
  const totalPrice = useTotalPrice();
  const addToCart = useAddToCart();

  return (
    <div>
      {cartProducts.map((product) => (
        <button
          key={product.productId}
          data-testid={`product-${product.productId}`}
          onClick={() => addToCart(product.productId)}
        />
      ))}
      <div data-testid="total">${totalPrice / 100}</div>
    </div>
  );
};

const renderWithCartProvider = (customerId: number) => {
  return render(
    <CartProvider customerId={customerId}>
      <TestingComponent />
    </CartProvider>
  );
};

afterEach(async () => {
  await emptyAllCarts();
});

describe("CartProvider", () => {
  test("Defaults to  $0 total", async () => {
    const { getByTestId } = renderWithCartProvider(DEFAULT_USER_ID);
    const component = await waitFor(() => getByTestId("total"));
    const total = component.textContent;

    expect(total).toEqual("$0");
  });

  test("Example Scenario 1 (Default)", async () => {
    const { getByTestId } = renderWithCartProvider(DEFAULT_USER_ID);
    const addClassicBtn = await waitFor(() =>
      getByTestId(`product-${CLASSIC_PRODUCT_ID}`)
    );
    const addStandoutBtn = await waitFor(() =>
      getByTestId(`product-${STANDOUT_PRODUCT_ID}`)
    );
    const addPremiumBtn = await waitFor(() =>
      getByTestId(`product-${PREMIUM_PRODUCT_ID}`)
    );

    fireEvent.click(addClassicBtn);
    fireEvent.click(addStandoutBtn);
    fireEvent.click(addPremiumBtn);

    await waitFor(() =>
      expect(getByTestId("total").textContent).toEqual("$987.97")
    );
  });

  test("Example Scenario 2 (SecondBite)", async () => {
    const { getByTestId } = renderWithCartProvider(SECONDBITE_USER_ID);
    const addClassicBtn = await waitFor(() =>
      getByTestId(`product-${CLASSIC_PRODUCT_ID}`)
    );
    const addPremiumBtn = await waitFor(() =>
      getByTestId(`product-${PREMIUM_PRODUCT_ID}`)
    );

    fireEvent.click(addClassicBtn);
    fireEvent.click(addClassicBtn);
    fireEvent.click(addClassicBtn);
    fireEvent.click(addPremiumBtn);

    await waitFor(() =>
      expect(getByTestId("total").textContent).toEqual("$934.97")
    );
  });

  test("Example Scenario 3 (Axil)", async () => {
    const { getByTestId } = renderWithCartProvider(AXIL_USER_ID);
    const addStandoutBtn = await waitFor(() =>
      getByTestId(`product-${STANDOUT_PRODUCT_ID}`)
    );
    const addPremiumBtn = await waitFor(() =>
      getByTestId(`product-${PREMIUM_PRODUCT_ID}`)
    );

    fireEvent.click(addStandoutBtn);
    fireEvent.click(addStandoutBtn);
    fireEvent.click(addStandoutBtn);
    fireEvent.click(addPremiumBtn);

    await waitFor(() =>
      expect(getByTestId("total").textContent).toEqual("$1294.96")
    );
  });
});
