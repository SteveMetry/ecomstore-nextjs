import { useState } from "react";

import { Layout } from ".components/Layout";
import { ProductSearch } from ".components/ProductSearch";
import { Product } from ".entities/product.interface";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <Layout navbarChildren={<ProductSearch setProducts={setProducts} />}>
      {/* Temporary: will be replaced */}
      {products.map((prod) => (
        <h1 key={prod.id}>{prod.title}</h1>
      ))}
    </Layout>
  );
}
