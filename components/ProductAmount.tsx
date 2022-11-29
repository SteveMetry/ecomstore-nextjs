import { FormEvent, useState } from "react";

import { Product } from ".entities/product.interface";
import { useCartItemsStore } from ".hooks/cartItemsStore";
import { CartItem } from ".entities/cartItem.interface";

interface ProductAmountProp {
  buttonLabel: string;
  prod: CartItem | Product;
  isCartItem?: boolean;
}

export const ProductAmount = ({
  buttonLabel,
  prod,
  isCartItem
}: ProductAmountProp) => {
  const [amount, setAmount] = useState(
    isCartItem ? (prod as CartItem).amount : 1
  );
  const [addCartItem, setCartItemAmount] = useCartItemsStore((state) => [
    state.addCartItem,
    state.setCartItemAmount
  ]);

  const onBtnClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isCartItem) {
      addCartItem(prod as Product, amount);
      setAmount(1);
    } else {
      setCartItemAmount(prod as CartItem, amount);
    }
  };

  return (
    <form onSubmit={onBtnClick}>
      <input
        type="number"
        className="
          w-24
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white
          border
          border-solid
          border-gray-300
          rounded
          focus:text-gray-700
          focus:bg-white
        "
        placeholder="Amount"
        min={0}
        max={
          !isCartItem ? (prod as Product).stock : (prod as CartItem).prodStock
        }
        value={amount}
        onChange={(event) => setAmount(parseInt(event.target.value || "0"))}
      />
      <button
        type="submit"
        className="
          px-4
          py-1.5
          bg-blue-400
          text-white
          font-bold
          rounded
          hover:bg-blue-500
          focus:bg-blue-500
          active:bg-blue-600
          ml-4
        "
      >
        {buttonLabel}
      </button>
    </form>
  );
};
