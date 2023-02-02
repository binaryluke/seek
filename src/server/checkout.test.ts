import { describe, expect, test } from "@jest/globals";
import { Checkout } from "./checkout";

const CLASSIC_PRODUCT = {
  id: 0,
  title: "Classic Title",
  description: "Classic Desc",
  price: 26999,
};

const STANDOUT_PRODUCT = {
  id: 1,
  title: "Standout Title",
  description: "Standout Description",
  price: 32299,
};

const PREMIUM_PRODUCT = {
  id: 2,
  title: "Premium Title",
  description: "Premium Description",
  price: 39499,
};

describe("Pricing Rules", () => {
  test("Can create a Checkout instance", () => {
    const co = Checkout.new([]);
    expect(co.total()).toBe(0);
  });

  test("Example scenario 1 (default)", () => {
    const co = Checkout.new([]);
    co.add(CLASSIC_PRODUCT);
    co.add(STANDOUT_PRODUCT);
    co.add(PREMIUM_PRODUCT);
    expect(co.total()).toBe(98797);
  });

  test("Example scenario 2 (SecondBite)", () => {
    const co = Checkout.new([
      {
        id: 0,
        customerId: 0,
        productId: CLASSIC_PRODUCT.id,
        rule: {
          name: "MultiBuy",
          perQty: 2,
          giveQty: 1,
        },
      },
    ]);
    co.add(CLASSIC_PRODUCT);
    co.add(CLASSIC_PRODUCT);
    co.add(CLASSIC_PRODUCT);
    co.add(PREMIUM_PRODUCT);

    expect(co.qtyByProductId(CLASSIC_PRODUCT.id)).toBe(3);
    expect(co.qtyByProductId(STANDOUT_PRODUCT.id)).toBe(0);
    expect(co.qtyByProductId(PREMIUM_PRODUCT.id)).toBe(1);
    expect(co.total()).toBe(93497);
  });

  test("Example scenario 3 (Axil)", () => {
    const co = Checkout.new([
      {
        id: 0,
        customerId: 0,
        productId: STANDOUT_PRODUCT.id,
        rule: {
          name: "FixedPrice",
          price: 29999,
        },
      },
    ]);
    co.add(STANDOUT_PRODUCT);
    co.add(STANDOUT_PRODUCT);
    co.add(STANDOUT_PRODUCT);
    co.add(PREMIUM_PRODUCT);

    expect(co.qtyByProductId(CLASSIC_PRODUCT.id)).toBe(0);
    expect(co.qtyByProductId(STANDOUT_PRODUCT.id)).toBe(3);
    expect(co.qtyByProductId(PREMIUM_PRODUCT.id)).toBe(1);
    expect(co.total()).toBe(129496);
  });
});
