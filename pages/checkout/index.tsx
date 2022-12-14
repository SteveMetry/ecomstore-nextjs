import Head from "next/head";
import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import { CartItemBlock } from ".components/CartItemBlock";
import { Layout } from ".components/Layout";
import { CartItem } from ".entities/cartItem.interface";
import { useCartItemsStore } from ".hooks/cartItemsStore";
import { stripePay } from ".hooks/stripePay";

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
    <>
      <Head key="Purchase your Shopping Cart">
        <title>Checkout Cart - SENDNET SHOP</title>
        <meta
          name="description"
          content="Create Your Cart And Checkout your items Here - Sendnet Checkout Page"
        />
        <meta name="title" content="CHECKOUT CART - SENDNET SHOP" />
        <meta
          name="keywords"
          content="Checkout your products here, Finilise Cart here, Sendnet's Online Chekcout, View Cart Now!, Sendnet Cart, sendnet checkout, sendnet pay here, sendnet, send net, SendNet"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
      </Head>

      <Layout
        navbarChildren={
          <h1
            className="
            font-thin
            text-4xl
            md:text-3xl
            text-white
          "
          >
            CHECKOUT CART
          </h1>
        }
        className="bg-slate-100 min-h-screen"
      >
        <div className="flex flex-col-reverse md:flex-row mt-12">
          <div className="rounded m-2 p-2">
            {userCartItems.map((item, index) => (
              <CartItemBlock
                key={`cart-item-${index}`}
                cartItem={item}
                isRemovable={true}
              ></CartItemBlock>
            ))}
          </div>
          <div
            className="grid grid-cols-2 bg-white rounded md:w-1/2 p-6 m-6 mt-24 md:mt-2 "
            style={{ height: "20rem" }}
          >
            <h4>Tax:</h4>
            <h4 className="text-right">${totalPrice / 10}</h4>
            <h4>Total:</h4>
            <h4 className="text-right">${totalPrice + totalPrice / 10}</h4>
            <button
              onClick={() =>
                stripePay([
                  { price: "price_1MMrHOFOFZSSkdZmQvEI5nt6", quantity: 1 }
                ])
              }
              className="
            bg-blue-400
            rounded
            w-full
            flex
            col-span-2
            h-12
            justify-center
            items-center
            text-white
          "
            >
              Pay Now
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
