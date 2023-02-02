import * as classes from "./CartItem.module.css";

interface CartItemProps {
  title: string;
  description: string;
  dealDescription?: string;
  price: number;
  qty: number;
  incrementQty(): void;
}

export const CartItem = (props: CartItemProps) => {
  return (
    <div className={classes.CartItem}>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <p data-testid="cartItemPrice">${props.price / 100}</p>
      <p data-testid="cartItemQty">{props.qty}</p>
      <button data-testid="cartItemIncreaseQtyBtn" onClick={props.incrementQty}>
        +
      </button>
    </div>
  );
};
