import { useEffect, useState } from "react";

import { CartItemBlock } from ".components/CartItemBlock";
import { Layout } from ".components/Layout";
import { CartItem } from ".entities/cartItem.interface";
import { useCartItemsStore } from ".hooks/cartItemsStore";

export default function CheckoutPage() {
  const [cartItems, setCartItemAmount] = useCartItemsStore((state) => [
    state.cartItems,
    state.setCartItemAmount
  ]);
  const [userCartItems, setUserCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setUserCartItems(cartItems);
    setTotalPrice(
      cartItems.map((item) => item.price).reduce((a, b) => a + b, 0)
    );
  }, [cartItems]);

  return (
    <Layout
      navbarChildren={
        <h1
          className="
            font-thin
            max-sm:text-4xl
            md:text-3xl
            text-white
          "
        >
          CHECKOUT
        </h1>
      }
    >
      <div className="preview-cart-container bg-white rounded m-2 p-2">
        {userCartItems.map((item, index) => (
          <CartItemBlock
            key={`cart-item-${index}`}
            cartItem={item}
            isRemovable={true}
          ></CartItemBlock>
        ))}
      </div>
      <div className="cart-info-container grid grid-cols-2">
        <h4>Tax:</h4>
        <h4>${totalPrice / 10}</h4>
        <h4>Total:</h4>
        <h4>${totalPrice}</h4>
      </div>
    </Layout>
  );
}
