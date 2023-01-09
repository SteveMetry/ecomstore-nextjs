import { Product } from ".entities/product.interface";
import Image from "next/image";
import Link from "next/link";
import { ProductAmount } from "./ProductAmount";
import { prodDesciption } from ".pages/index";
import styles from ".styles/categoriesProducts.module.scss";
import Script from "next/script";

interface CategoriesProductsProp {
  products: Product[];
  className?: string;
  cardWidth?: string;
  excludeProdsByIds?: string | string[];
}

export const CategoriesProducts = ({
  products,
  className,
  cardWidth,
  excludeProdsByIds
}: CategoriesProductsProp) => {
  return (
    <div className={className != undefined ? className : styles.products}>
      {products?.map((prod) => {
        if (excludeProdsByIds?.includes(`${prod.id}`) == true) {
          return;
        }
        return (
          <div
            key={prod.id}
            className={`shadow-xl rounded-xl flex flex-col justify-between items-center p-4 bg-white w-11/12  ${
              cardWidth === undefined ? "md:w-1/4" : cardWidth
            } gap-6 p-8 text-xs font-light`}
          >
            <div className="flex flex-col items-center w-full">
              <h4>{prod.brand}</h4>
              <div
                className="relative my-4"
                style={{
                  aspectRatio: "3/2",
                  height: "5rem",
                  maxWidth: "6rem",
                  margin: "auto"
                }}
              >
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
        );
      })}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3159767499477222"
        crossOrigin="anonymous"
      ></Script>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3159767499477222"
        data-ad-slot="8931114010"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  );
};
