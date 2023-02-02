import { Page } from "../components/Page";
import {
  useCartProducts,
  useTotalPrice,
  useAddToCart,
} from "../providers/CartProvider";
import { CartItem } from "../components/CartItem";

export const CheckoutRoute = () => {
  const cartProducts = useCartProducts();
  const totalPrice = useTotalPrice();
  const addToCart = useAddToCart();

  return (
    <Page title="Checkout">
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
      <p>
        Total:{" "}
        <span data-testid="checkoutTotalPrice">
          ${totalPrice ? totalPrice / 100 : 0}
        </span>
      </p>
    </Page>
  );
};
