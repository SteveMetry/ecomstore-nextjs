import Image from "next/image";

import { Layout } from ".components/Layout";
import { ProductAmount } from ".components/ProductAmount";
import { Product } from ".entities/product.interface";

interface Path {
  params: {
    prodId: string;
  };
}

export default function Character(prod: Product) {
  return (
    <Layout
      navbarChildren={
        <h2
          className="
            font-thin
            max-sm:text-4xl
            md:text-3xl
            text-white"
        >
          Search Bar Here
        </h2>
      }
      className="min-h-screen flex flex-cols"
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

export async function getStaticProps(path: Path) {
  const result = await fetch(
    `https://dummyjson.com/products/${path.params.prodId}`
  ).then((res) => res.json());

  return {
    props: result
  };
}
