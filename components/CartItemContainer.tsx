import Image from "next/image";
import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/24/outline";

import { useCartItemsStore } from ".hooks/cartItemsStore";
import { ProductAmount } from "./ProductAmount";

export const CartItemContainer = () => {
  const [cartItems, removeCartItem, setDisplayCartItems] = useCartItemsStore(
    (state) => [
      state.cartItems,
      state.removeCartItem,
      state.setDisplayCartItems
    ]
  );

  const onOverlayClick = () => {
    document.body.classList.remove("overflow-y-hidden");
    setDisplayCartItems(false);
  };

  return (
    <>
      <div
        className="bg-black opacity-70 fixed top-0 left-0 w-screen h-screen z-20"
        onClick={onOverlayClick}
      ></div>
      <div className="fixed top-0 right-0 bg-slate-200 w-96 h-screen flex flex-col p-4 overflow-y-auto z-20">
        <h2 className="text-center font-normal">My Cart</h2>
        {cartItems.map((prod, index) => (
          <div key={`Cart item ${index + 1}`} className="mt-4">
            <button
              className="absolute right-7 mt-2"
              onClick={() => removeCartItem(prod)}
            >
              <XCircleIcon className="w-5" />
            </button>
            <div className="bg-white rounded-xl flex flex-col p-4">
              <h3 className="w-72 truncate mb-2">{prod.title.toUpperCase()}</h3>
              <div className="flex justify-between items-center">
                <div className="relative h-20 w-20">
                  <Image src={prod.thumbnail} alt={prod.title} fill />
                </div>
                <div className="flex flex-col text-right">
                  <h3 className="text-gray-600 md:text-sm">
                    ${prod.price} each
                  </h3>
                  <h3 className="text-gray-600 md:text-sm pb-2">Quantity:</h3>
                  <ProductAmount
                    buttonLabel="Set"
                    prod={prod}
                    isCartItem={true}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <Link
          href="/checkout"
          className={`
            px-4
            py-1.5
            text-white
            font-bold
            rounded
            hover:bg-blue-500
            focus:bg-blue-500
            active:bg-blue-600
            mt-6
            ${
              cartItems.length > 0
                ? "pointer-events-auto bg-blue-400"
                : "pointer-events-none bg-blue-200"
            }
          `}
        >
          Proceed to checkout
        </Link>
      </div>
    </>
  );
};
