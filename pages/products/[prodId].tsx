import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Layout } from ".components/Layout";
import { ProductAmount } from ".components/ProductAmount";
import { Product } from ".entities/product.interface";
import { getProducts } from ".hooks/getProducts";

interface Path {
  params: {
    prodId: string;
  };
}

export default function ProductPage(prod: Product) {
  const [searchInput, setSearchInput] = useState("");

  return (
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
        </div>
      }
      className="min-h-screen"
    >
      <div className="flex flex-col w-full mt-24">
        <h1 className="text-center text-gray-900 text-4xl font-light mb-4">
          {prod.title}
        </h1>
        <div className="grid grid-cols-2">
          <div
            className="relative mx-8 my-20"
            style={{ aspectRatio: "3/2", height: "21rem", margin: "auto" }}
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
    </Layout>
  );
}

export async function getStaticPaths() {
  let pathList: Path[] = [];
  const staticPaths = () => {
    for (let i = 1; i <= 99; i++) {
      pathList.push({
        params: {
          prodId: i.toString()
        }
      });
    }
    return pathList;
  };
  return {
    paths: staticPaths(),
    fallback: true // can also be true or 'blocking'
  };
}

export async function getStaticProps(paths: Path) {
  const prods = await getProducts();
  const result = prods.products.find(
    (item: Product) => item.id === parseInt(paths.params.prodId)
  );
  return {
    props: result
  };
}
