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
    <div className="flex justify-between p-4 md:max-w-7xl">
      {isRemovable && (
        <button className="mr-6" onClick={() => removeCartItem(cartItem)}>
          ⌘
        </button>
      )}
      <div className="each-cart-card grid grid-cols-2 w-full gap-4">
        <h2 className="text-right md:text-left font-thin">
          Price: ${cartItem.price}
        </h2>
        <h2 className="text-right font-thin">Quantity: {cartItem.amount}☆</h2>
        <Image
          src={cartItem.thumbnail}
          alt={`Cart item: ${cartItem.id}`}
          width={120}
          height={100}
          className="col-span-2 m-auto md:col-span-1"
        />
        <h4 className="hidden md:block">{cartItem.description}</h4>
        <h2 className="font-thin col-span-2 text-center md:text-right">
          {cartItem.title}
        </h2>
      </div>
    </div>
  );
};
