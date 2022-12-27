import { Dispatch, SetStateAction, useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline";

import { Product } from ".entities/product.interface";
import { useCartItemsStore } from ".hooks/cartItemsStore";
import { getProducts } from ".hooks/getProducts";

interface ProductSearchProp {
  displayAmount: boolean;
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export const ProductSearch = ({
  displayAmount,
  setProducts
}: ProductSearchProp) => {
  const [searchInput, setSearchInput] = useState("");
  const [cartItems, setDisplayCartItems] = useCartItemsStore((state) => [
    state.cartItems,
    state.setDisplayCartItems
  ]);

  const searchTyped = async () => {
    const prods = await getProducts();
    let searchResults = ((prods.products || []) as Product[]).filter(
      (product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase().trim())
    );
    setProducts(searchResults);
  };

  const onCartBtnClick = () => {
    document.body.classList.add("overflow-y-hidden");
    setDisplayCartItems(true);
  };

  return (
    <>
      <div className="flex items-stretch max-w-lg mr-6">
        <input
          type="search"
          className="flex-auto min-w-0 w-full px-3 py-1.5 rounded-l-lg text-gray-700 bg-white transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none"
          placeholder="Search Products"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <button
          className={`btn px-4 border border-solid rounded-r-lg focus:outline-none focus:ring-0 ${
            searchInput.trim().length < 3
              ? "border-gray-500 bg-gray-500 cursor-not-allowed text-white"
              : "bg-white hover:bg-gray-200"
          }`}
          onClick={searchTyped}
          disabled={searchInput.trim().length < 3}
        >
          <MagnifyingGlassIcon className="w-4" />
        </button>
      </div>
      <button className="flex" onClick={onCartBtnClick}>
        <ShoppingCartIcon className="h-full text-white w-10" />
        <span className="bg-white px-2 rounded-full relative right-4">
          {displayAmount
            ? cartItems.map((item) => item.amount).reduce((a, b) => a + b, 0)
            : 0}
        </span>
      </button>
    </>
  );
};
