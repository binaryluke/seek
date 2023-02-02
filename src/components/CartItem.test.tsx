import { describe, expect, test, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react";
import { CartItem } from "./CartItem";

describe("CartItem", () => {
  test("Displays default cart item information", () => {
    const component = render(
      <CartItem
        title="Test Title"
        description="Test Desc"
        price={10999}
        qty={0}
        incrementQty={() => null}
      />
    );

    component.getByText("Test Title");
    component.getByText("Test Desc");
    expect(component.getByTestId("cartItemPrice").textContent).toEqual(
      "$109.99"
    );
    expect(component.getByTestId("cartItemQty").textContent).toEqual("0");
  });

  test("Shows the correct quantity", () => {
    const component = render(
      <CartItem
        title="Test Title"
        description="Test Desc"
        price={10999}
        qty={8}
        incrementQty={() => null}
      />
    );

    expect(component.getByTestId("cartItemQty").textContent).toEqual("8");
  });

  test("Calls incrementQty at the correct time", () => {
    const mockFn = jest.fn();
    const component = render(
      <CartItem
        title="Test Title"
        description="Test Desc"
        price={10999}
        qty={8}
        incrementQty={mockFn}
      />
    );

    fireEvent.click(component.getByTestId("cartItemIncreaseQtyBtn"));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test.skip("Displays deal info if applicable", () => {});

  test.skip("Snapshot of default", () => {});

  test.skip("Snapshot with deal and positive qty", () => {});
});
