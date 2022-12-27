import makeup from ".data/makeup.json";
import pets from ".data/pets.json";
import { Product } from ".entities/product.interface";

export async function getProducts() {
  const result = await fetch(`https://dummyjson.com/products?limit=100`).then(
    (res) => res.json()
  );
  makeup.products.map((item) => {
    result.products.push(item);
  });
  pets.products.map((item) => {
    result.products.push(item);
  });
  return result;
}

export async function getSearchedProducts(searchInput: string) {
  const prods = await getProducts();
  return ((prods.products || []) as Product[]).filter((product) =>
    product.title.toLowerCase().includes(searchInput.trim().toLowerCase())
  );
}
