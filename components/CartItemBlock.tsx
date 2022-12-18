import Image from "next/image";

import { CartItem } from ".entities/cartItem.interface";
import { useCartItemsStore } from ".hooks/cartItemsStore";

interface CartItemList {
  cartItem: CartItem;
  isRemovable?: boolean;
}

export const CartItemBlock = ({ cartItem, isRemovable }: CartItemList) => {
  const removeCartItem = useCartItemsStore((state) => state.removeCartItem);
  return (
    <>
      {isRemovable && (
        <button onClick={() => removeCartItem(cartItem)}>⌘</button>
      )}
      <div className="each-cart-card grid grid-cols-3 grid-rows-2 font-thin">
        <h2>{cartItem.title}</h2>
        <h2 className="text-right">Quantity: {cartItem.amount}☆</h2>
        <h2 className="text-right">Price: ${cartItem.price}</h2>
        <Image
          src={cartItem.thumbnail}
          alt={`Cart item: ${cartItem.id}`}
          width={44}
          height={44}
        />
        <h2 className="col-span-2 text-center tracking-tight">
          {cartItem.description}
        </h2>
      </div>
    </>
  );
};
