import * as classes from "./CartItem.module.css";
import { QtyControl } from "./QtyControl";

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
    <section className={classes.CartItem}>
      <header>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.description}</p>
      </div>
      <div className={classes.data}>
        <QtyControl qty={props.qty} incrementQty={props.incrementQty} />
        <p data-testid="cartItemPrice">${props.price / 100}</p>
      </div>
    </section>
  );
};
