import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import { CartItemContainer } from ".components/CartItemContainer";
import { Layout } from ".components/Layout";
import { ProductAmount } from ".components/ProductAmount";
import { ProductSearch } from ".components/ProductSearch";
import { Product } from ".entities/product.interface";
import { useCartItemsStore } from ".hooks/cartItemsStore";
import { getSearchedProducts } from ".hooks/getProducts";

const customList = ["pets", "makeup"];

function prodDesciption(description: string) {
  description = description
    .trim() // trailing spaces
    .replace(/[-;&,]/g, " ") // replace unneccessary characters with single space
    .replace(/\s+/g, " ") // replace double spaces with single space
    .toLowerCase();
  const shortText =
    description.length > 130
      ? `${description.substring(0, 130)}...` // too many characters
      : description;
  return shortText;
}

export default function Home() {
  const [displayAmount, setDisplayAmount] = useState(false);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [chosenCategory, setChosenCategory] = useState("");
  const [displayCategories, setDisplayCategories] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [displayCartItems, setDisplayCartItems] = useCartItemsStore((state) => [
    state.displayCartItems,
    state.setDisplayCartItems
  ]);
  const router = useRouter();

  const onCategoryClick = (category: string) => {
    setChosenCategory(category);
    let url = `https://dummyjson.com/products/category/${category}`;
    if (customList.find((curCategory) => curCategory === category)) {
      url = `/data/${category}.json`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((results) => {
        setProducts(results?.products || []);
      });
  };

  const searchTyped = async (searchInput: string) => {
    const searchResults = await getSearchedProducts(searchInput);
    setProducts(searchResults);
  };

  useEffect(() => {
    // before refresh page, close cart item container popup
    window.onbeforeunload = () => setDisplayCartItems(false);
    fetch(`https://dummyjson.com/products/categories`)
      .then((response) => response.json())
      .then((categories) => {
        const initialCatList = [...categories, ...customList];
        setCategoryList(initialCatList);
      });
    if (router.query.search == null) {
      // hardcode minId and maxId to reduce amount of requests being called
      const minId = 1;
      const maxId = 100;
      const randomIds: number[] = [];
      const initialProdList: Product[] = [];
      for (let i = 0; i < 13; i++) {
        let randomProdId =
          Math.floor(Math.random() * (maxId - minId + 1)) + minId;
        while (randomIds.find((id) => id === randomProdId)) {
          randomProdId =
            Math.floor(Math.random() * (maxId - minId + 1)) + minId;
        }
        randomIds.push(randomProdId);
      }
      randomIds.forEach((id) => {
        fetch(`https://dummyjson.com/products/${id}`)
          .then((response) => response.json())
          .then((prod: Product) => {
            initialProdList.push(prod);
          });
      });
      setProducts(initialProdList);
    } else {
      searchTyped(router.query.search as string);
    }
    setDisplayAmount(true);
  }, [router.query.search, setDisplayCartItems]);

  return (
    <Layout
      navbarChildren={
        <ProductSearch
          displayAmount={displayAmount}
          searchTyped={searchTyped}
        />
      }
      className="min-h-screen"
    >
      <div className="flex justify-center items-center">
        <button onClick={() => setDisplayCategories(!displayCategories)}>
          {displayCategories ? (
            <MinusIcon className="w-4" />
          ) : (
            <PlusIcon className="w-4" />
          )}
        </button>
        <h1 className="ml-4">Categories: {chosenCategory.toUpperCase()}</h1>
      </div>
      <div
        className={`${
          displayCategories ? "grid" : "hidden"
        } grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 gap-y-4 p-4 md:p-6 text-xs`}
      >
        {categoryList.map((category, index) => (
          <button
            key={`Category ${index + 1}`}
            className="text-gray-700 uppercase bg-slate-50 rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg p-2"
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="shadow-xl rounded-xl flex flex-col justify-between items-center p-4 bg-white"
          >
            <div className="flex flex-col items-center w-full">
              <h4>{prod.brand}</h4>
              <div className="relative h-32 w-32 my-4">
                <Image src={prod.thumbnail} alt={prod.title} fill />
              </div>
              <div className="flex justify-between items-center w-full">
                <Link
                  href={`/products/${prod.id}`}
                  className="hover:text-blue-400"
                >
                  {prod.title.toUpperCase()}
                </Link>
                <h4 className="text-gray-400">${prod.price}</h4>
              </div>
              <p className="my-4 w-full">{prodDesciption(prod.description)}</p>
            </div>
            <ProductAmount buttonLabel="Add to cart" prod={prod} />
          </div>
        ))}
        {displayCartItems && <CartItemContainer />}
      </div>
    </Layout>
  );
}
