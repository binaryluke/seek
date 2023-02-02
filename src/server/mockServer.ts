/* DISCLAIMER: Everything in here in just fudge as my focus is on the frontend for this code test */

import { database } from "./mockDatabase";
import { Checkout, CheckoutInstance } from "./checkout";

interface CustomerCheckoutMap {
  [customerId: number]: CheckoutInstance;
}

let customerCheckoutMap: CustomerCheckoutMap = {};

export interface CartProduct {
  productId: number;
  title: string;
  description: string;
  price: number;
  qty: number;
}

export interface CartResponse {
  cartProducts: CartProduct[];
  totalPrice: number;
  updateTime: number;
}

// Async to simulate http request
export const getCart = async (customerId: number) => {
  const pricingRules = database.pricingRules.filter(
    (pricingRule) => pricingRule.customerId === customerId
  );
  const checkout = customerCheckoutMap[customerId];
  const cartProducts: CartProduct[] = database.products.map((product) => {
    const fixedPricingRule = pricingRules.find(
      (pricingRule) =>
        pricingRule.productId === product.id &&
        pricingRule.rule.name === "FixedPrice"
    );
    let price = product.price;
    if (fixedPricingRule?.rule.name === "FixedPrice") {
      price = fixedPricingRule.rule.price;
    }
    const qty = checkout?.qtyByProductId(product.id) || 0;
    return {
      productId: product.id,
      title: product.title,
      description: product.description,
      price,
      qty,
    };
  });

  return {
    cartProducts,
    totalPrice: checkout ? checkout.total() : 0,
    updateTime: Date.now(),
  };
};

// Async to simulate http request
export const addToCart = async (customerId: number, productId: number) => {
  const product = database.products.find((product) => product.id === productId);
  let checkout = customerCheckoutMap[customerId];

  if (!checkout) {
    const pricingRules = database.pricingRules.filter(
      (pricingRule) => pricingRule.customerId === customerId
    );
    checkout = customerCheckoutMap[customerId] = Checkout.new(pricingRules);
  }

  if (product) {
    checkout.add(product);
  }

  const cart = await getCart(customerId);
  return cart;
};

export const emptyCart = async (customerId: number) => {
  delete customerCheckoutMap[customerId];
};

export const emptyAllCarts = async () => {
  customerCheckoutMap = {};
};
