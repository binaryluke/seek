interface CustomerSchema {
  id: number;
  name: string;
}

export interface ProductSchema {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface MultiBuyPricingRuleCondition {
  name: "MultiBuy";
  perQty: number;
  giveQty: number;
}

interface FixedPricingRuleCondition {
  name: "FixedPrice";
  price: number;
}

export interface PricingRuleSchema {
  id: number;
  customerId: number;
  productId: number;
  rule: MultiBuyPricingRuleCondition | FixedPricingRuleCondition;
}

interface database {
  customers: CustomerSchema[];
  products: ProductSchema[];
  pricingRules: PricingRuleSchema[];
}

export const database: database = {
  customers: [
    { id: 0, name: "Default" },
    { id: 1, name: "SecondBite" },
    { id: 2, name: "Axil Coffee Roasters" },
    { id: 3, name: "Myer" },
  ],
  products: [
    {
      id: 0,
      title: "Classic Ad",
      description: "Offers the most basic level of advertisement",
      price: 26999,
    },
    {
      id: 1,
      title: "Stand out Ad",
      description:
        "Allows advertisers to use a company logo and use a longer presentation text",
      price: 32299,
    },
    {
      id: 2,
      title: "Premium Ad",
      description:
        "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility",
      price: 39499,
    },
  ],
  pricingRules: [
    {
      id: 0,
      customerId: 1,
      productId: 0,
      rule: { name: "MultiBuy", perQty: 3, giveQty: 2 },
    },
    {
      id: 1,
      customerId: 2,
      productId: 1,
      rule: { name: "FixedPrice", price: 29999 },
    },
    {
      id: 2,
      customerId: 3,
      productId: 1,
      rule: { name: "MultiBuy", perQty: 5, giveQty: 4 },
    },
    {
      id: 3,
      customerId: 3,
      productId: 2,
      rule: { name: "FixedPrice", price: 38999 },
    },
  ],
};
