/* In spirit of Keep It Simple and not spend too much time on this, not bothering to re-mock the database module */

import { describe, expect, test } from "@jest/globals";
import { addToCart, emptyCart, getCart } from "./mockServer";

const DEFAULT_CUSTOMER_ID = 0;
const SECONDBITE_CUSTOMER_ID = 1;
const AXIL_CUSTOMER_ID = 2;

const CLASSIC_PRODUCT_UI = {
  productId: 0,
  title: "Classic Ad",
  description: "Offers the most basic level of advertisement",
  price: 26999,
  qty: 0,
};

const STANDOUT_PRODUCT_UI = {
  productId: 1,
  title: "Stand out Ad",
  description:
    "Allows advertisers to use a company logo and use a longer presentation text",
  price: 32299,
  qty: 0,
};

const PREMIUM_PRODUCT_UI = {
  productId: 2,
  title: "Premium Ad",
  description:
    "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility",
  price: 39499,
  qty: 0,
};

describe("Server", () => {
  test("getProducts", async () => {
    await emptyCart(DEFAULT_CUSTOMER_ID);
    const { cartProducts, totalPrice } = await getCart(DEFAULT_CUSTOMER_ID);
    expect(cartProducts).toEqual([
      CLASSIC_PRODUCT_UI,
      STANDOUT_PRODUCT_UI,
      PREMIUM_PRODUCT_UI,
    ]);
    expect(totalPrice).toEqual(0);
  });

  test("getCart", async () => {
    // Example scenario 1 (default)
    await emptyCart(DEFAULT_CUSTOMER_ID);
    await addToCart(DEFAULT_CUSTOMER_ID, CLASSIC_PRODUCT_UI.productId);
    await addToCart(DEFAULT_CUSTOMER_ID, STANDOUT_PRODUCT_UI.productId);
    let result = await addToCart(
      DEFAULT_CUSTOMER_ID,
      PREMIUM_PRODUCT_UI.productId
    );
    expect(result.totalPrice).toEqual(98797);

    // Example scenario 2 (SecondBite)
    await emptyCart(SECONDBITE_CUSTOMER_ID);
    await addToCart(SECONDBITE_CUSTOMER_ID, CLASSIC_PRODUCT_UI.productId);
    await addToCart(SECONDBITE_CUSTOMER_ID, CLASSIC_PRODUCT_UI.productId);
    await addToCart(SECONDBITE_CUSTOMER_ID, CLASSIC_PRODUCT_UI.productId);
    result = await addToCart(
      SECONDBITE_CUSTOMER_ID,
      PREMIUM_PRODUCT_UI.productId
    );
    expect(result.totalPrice).toEqual(93497);

    // Example scenario 3 (Axil)
    await emptyCart(AXIL_CUSTOMER_ID);
    await addToCart(AXIL_CUSTOMER_ID, STANDOUT_PRODUCT_UI.productId);
    await addToCart(AXIL_CUSTOMER_ID, STANDOUT_PRODUCT_UI.productId);
    await addToCart(AXIL_CUSTOMER_ID, STANDOUT_PRODUCT_UI.productId);
    result = await addToCart(AXIL_CUSTOMER_ID, PREMIUM_PRODUCT_UI.productId);
    expect(result.totalPrice).toEqual(129496);
  });
});
