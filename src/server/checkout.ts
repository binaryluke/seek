import { PricingRuleSchema, ProductSchema } from "./database";

interface CartItem {
  product: ProductSchema;
  qty: number;
}

class CheckoutInstance {
  pricingRules: PricingRuleSchema[];
  cartItems: CartItem[];

  constructor(pricingRules: PricingRuleSchema[]) {
    this.pricingRules = pricingRules;
    this.cartItems = [];
  }

  add(product: ProductSchema) {
    const cartItem = this.cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );

    if (cartItem) {
      cartItem.qty++;
    } else {
      this.cartItems.push({
        product,
        qty: 1,
      });
    }
  }

  total() {
    // All current pricing rules run per-product, so no overall rules to implement upfront

    return (
      this.cartItems
        // Run pricing rules if any and return price
        .map((cartItem) => {
          // TODO: Should really allow multiple rules per cart item here
          const pricingRule = this.pricingRules.find(
            (pricingRule) => pricingRule.productId === cartItem.product.id
          );

          if (!pricingRule) {
            return cartItem.product.price * cartItem.qty;
          }

          switch (pricingRule.rule.name) {
            case "MultiBuy": {
              const freeQty = Math.floor(
                cartItem.qty / pricingRule.rule.perQty
              );
              return (cartItem.qty - freeQty) * cartItem.product.price;
            }
            case "FixedPrice": {
              return pricingRule.rule.price * cartItem.qty;
            }
          }
        })
        // Sum up total price now that rules have run
        .reduce((total, price) => total + price, 0)
    );
  }
}

// Conform to pseudocode interface
export const Checkout = {
  new: (pricingRules: PricingRuleSchema[]) => {
    return new CheckoutInstance(pricingRules);
  },
};
