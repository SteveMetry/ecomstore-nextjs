import { Dispatch, SetStateAction, useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline";

import { Product } from ".entities/product.interface";

interface ProductSearchProp {
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export const ProductSearch = ({ setProducts }: ProductSearchProp) => {
  const categories = [
    {
      key: "dummyJSON",
      desc: "Dummy Products"
    },
    {
      key: "pets",
      desc: "Pets"
    },
    {
      key: "makeup",
      desc: "Makeup"
    }
  ];
  const [searchCategory, setSearchCategory] = useState("dummyJSON");
  const [searchInput, setSearchInput] = useState("");

  const searchTyped = () => {
    if (searchCategory === "dummyJSON") {
      fetch(`https://dummyjson.com/products/search?q=${searchInput}`)
        .then((response) => response.json())
        .then((searchResults) => {
          setProducts(searchResults?.products || []);
        });
    } else {
      fetch(`/data/${searchCategory}.json`)
        .then((response) => response.json())
        .then((results) => {
          let searchResults = ((results?.products || []) as Product[]).filter(
            (product) =>
              product.title
                .toLowerCase()
                .includes(searchInput.toLowerCase().trim())
          );
          setProducts(searchResults);
        });
    }
  };

  return (
    <>
      <div className="flex items-stretch max-w-lg mr-6">
        <select
          className="px-2 rounded-l-lg focus:outline-none"
          onChange={(event) => setSearchCategory(event.target.value)}
        >
          {categories.map((category, index) => (
            <option key={`Cat-${index}:${category.key}`} value={category.key}>
              {category.desc}
            </option>
          ))}
        </select>
        <input
          type="search"
          className="flex-auto min-w-0 w-full px-3 py-1.5 text-gray-700 bg-white transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none"
          placeholder="Search Products"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <button
          className={`btn px-4 border border-solid rounded-r-lg focus:outline-none focus:ring-0 ${
            searchInput.trim().length < 3
              ? "border-gray-500 bg-gray-500 text-white"
              : "bg-white hover:bg-gray-200"
          }`}
          onClick={searchTyped}
          disabled={searchInput.trim().length < 3}
        >
          <MagnifyingGlassIcon className="w-4" />
        </button>
      </div>
      <button>
        <ShoppingCartIcon className="h-full text-white w-10" />
        <span
          id="cartAmount"
          className="bg-white px-2 rounded-full absolute top-3.5"
        >
          0
        </span>
      </button>
    </>
  );
};
