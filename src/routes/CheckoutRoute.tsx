import { Page } from "../components/Page";
import {
  useCartProducts,
  useTotalPrice,
  useAddToCart,
} from "../providers/CartProvider";
import { CartItem } from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import * as classes from "./CheckoutRoute.module.css";

export const CheckoutRoute = () => {
  const cartProducts = useCartProducts();
  const totalPrice = useTotalPrice();
  const addToCart = useAddToCart();
  const navigate = useNavigate();

  return (
    <Page className={classes.checkoutRoute} title="Checkout">
      <ul data-testid="checkoutCartItems">
        {cartProducts.map((cartProduct) => (
          <li
            data-testid={`checkoutProductId-${cartProduct.productId}`}
            key={cartProduct.productId}
          >
            <CartItem
              {...cartProduct}
              incrementQty={() => addToCart(cartProduct.productId)}
            />
          </li>
        ))}
      </ul>
      <div className={classes.confirmPane}>
        <p className={classes.total}>
          Total:{" "}
          <span data-testid="checkoutTotalPrice">
            ${totalPrice ? totalPrice / 100 : 0}
          </span>
        </p>
        <button
          className={classes.purchaseBtn}
          disabled={!totalPrice}
          onClick={() => navigate("/success")}
        >
          Purchase
        </button>
      </div>
    </Page>
  );
};
