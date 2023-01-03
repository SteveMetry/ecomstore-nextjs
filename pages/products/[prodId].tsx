import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline";

import { CartItemContainer } from ".components/CartItemContainer";
import { CategoriesProducts } from ".components/CategoriesProducts";
import { Layout } from ".components/Layout";
import { ProductAmount } from ".components/ProductAmount";
import makeup from ".data/makeup.json";
import pets from ".data/pets.json";
import { Product } from ".entities/product.interface";
import { getProducts } from ".hooks/getProducts";
import { useCartItemsStore } from ".hooks/cartItemsStore";

interface Path {
  params: {
    prodId: string;
  };
}

async function getCategoryProducts(
  category: string,
  setProds: (prod: Product[]) => void
) {
  const categoryProducts = await fetch(
    `https://dummyjson.com/products/category/${category}`
  ).then((response) => response.json());
  const prods: Product[] = await [
    ...categoryProducts.products,
    ...makeup.products,
    ...pets.products
  ].filter((item: Product) => item.category === category);
  setProds(prods);
}

export default function ProductPage(prod: Product) {
  const [categoryProducts, setCategoryProducts] = useState(false);
  const [prods, setProds] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [displayCartItems, setDisplayCartItems] = useCartItemsStore((state) => [
    state.displayCartItems,
    state.setDisplayCartItems
  ]);
  const cartItems = useCartItemsStore((state) => state.cartItems);
  const [displayAmount, setDisplayAmount] = useState(false);
  const onCartBtnClick = () => {
    document.body.classList.add("overflow-y-hidden");
    setDisplayCartItems(true);
  };

  useEffect(() => {
    setDisplayAmount(true);
  }, [setDisplayCartItems]);

  if (prod == null) {
    return <p>Product Not Found</p>;
  }

  if (categoryProducts === false) {
    getCategoryProducts(prod.category, setProds);
    setCategoryProducts(true);
  }

  return (
    <>
      <Head key={prod.id}>
        <title>{prod.title}</title>
        <meta
          name="description"
          content={`SENDNET - $${prod.price}. ${prod.description}`}
        ></meta>
      </Head>
      <Layout
        navbarChildren={
          <div className="flex items-stretch max-w-lg mr-6">
            <input
              type="search"
              className="flex-auto min-w-0 w-full px-3 py-1.5 rounded-l-lg text-gray-700 bg-white transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none"
              placeholder="Search Products"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <Link
              className={`btn px-4 py-2 border border-solid rounded-r-lg focus:outline-none focus:ring-0 ${
                searchInput.trim().length < 3
                  ? "border-gray-500 bg-gray-500 cursor-not-allowed text-white pointer-events-none"
                  : "bg-white hover:bg-gray-200 pointer-events-auto"
              }`}
              href={`/?search=${searchInput}`}
            >
              <MagnifyingGlassIcon className="w-4" />
            </Link>
            <button className="flex" onClick={onCartBtnClick}>
              <ShoppingCartIcon className="h-full text-white w-10" />
              <span className="bg-white px-2 rounded-full relative right-4">
                {displayAmount
                  ? cartItems
                      .map((item) => item.amount)
                      .reduce((a, b) => a + b, 0)
                  : 0}
              </span>
            </button>
          </div>
        }
        className="overflow-x-hidden"
      >
        <div className="flex flex-col w-full mt-24 md:mt-12">
          <h1 className="text-center text-gray-900 text-4xl font-light mb-2">
            {prod.title}
          </h1>
          <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2">
            <div
              className="relative mx-8 my-20"
              style={{ aspectRatio: "3/2", height: "20vh", margin: "auto" }}
            >
              <Image
                className="rounded-sm object-contain"
                src={prod.thumbnail}
                alt={prod.title}
                fill
              />
            </div>
            <div
              style={{ width: "70%", height: "90%" }}
              className="shadow-md rounded-xl flex flex-col justify-between p-8 bg-white my-8 mx-16 text-gray-700"
            >
              <h3 className="font-light">Price: ${prod.price}</h3>
              <h3 className="font-light">Category: {prod.category}</h3>
              <h3 className="font-light">{prod.rating}☆</h3>
              <h3 className="font-light">Strock: {prod.stock} Left in Stock</h3>
              <h3 className="font-light">Brand: {prod.brand}</h3>
              <ProductAmount
                buttonLabel="Add to cart"
                prod={prod}
                className="flex justify-center"
              />
            </div>
          </div>
          <h4 className="text-xl font-light leading-relaxed text-center my-8 text-gray-800">
            {prod.description}
          </h4>
        </div>
        {displayCartItems && <CartItemContainer />}
      </Layout>
      <h2 className="font-extrabold tracking-wider text-center p-6 bg-slate-300 text-xl text-white">
        More From - {prod.category.replace("-", " ")}
      </h2>
      <CategoriesProducts
        products={prods}
        excludeProdsByIds={prod.id.toString()}
      />
    </>
  );
}

// export async function getStaticPaths() {
//   let pathList: Path[] = [];
//   const staticPaths = () => {
//     for (let i = 1; i <= 106; i++) {
//       pathList.push({
//         params: {
//           prodId: i.toString()
//         }
//       });
//     }
//     return pathList;
//   };
//   return {
//     paths: staticPaths(),
//     fallback: true // can also be true or 'blocking'
//   };
// }

export async function getServerSideProps(context: any) {
  const prods = await getProducts();
  const result = await prods.products.find(
    (item: Product) => item.id === parseInt(context.params.prodId)
  );
  return {
    props: result || null
  };
}
