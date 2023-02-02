import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getCart as getCartFromServer,
  addToCart as addToCartOnServer,
  CartProduct,
  CartResponse,
} from "../server/mockServer";

interface CartContext {
  totalPrice: number;
  cartProducts: CartProduct[];
  addToCart(productId: number): void;
}
interface CartProvider {
  customerId: number;
}

const CartContext = createContext<CartContext>({
  totalPrice: 0,
  cartProducts: [],
  addToCart: () => {},
});

export const CartProvider = (props: PropsWithChildren<CartProvider>) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);
  const handleCartUpdate = (data: CartResponse) => {
    if (data.updateTime > lastUpdateTime) {
      setLastUpdateTime(data.updateTime);
      setCartProducts(data.cartProducts);
      setTotalPrice(data.totalPrice);
    }
  };
  const addToCart = (productId: number) =>
    addToCartOnServer(props.customerId, productId).then(handleCartUpdate);

  useEffect(() => {
    setCartProducts([]);
    setTotalPrice(0);
    getCartFromServer(props.customerId).then(handleCartUpdate);
  }, [props.customerId]);

  const value = { totalPrice, cartProducts, addToCart };
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export const useCartProducts = () => {
  const { cartProducts } = useContext(CartContext);
  return cartProducts;
};

export const useTotalPrice = () => {
  const { totalPrice } = useContext(CartContext);
  return totalPrice;
};

export const useAddToCart = () => {
  const { addToCart } = useContext(CartContext);
  return addToCart;
};
