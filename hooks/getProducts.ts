import makeup from ".data/makeup.json";
import pets from ".data/pets.json";
import { Product } from ".entities/product.interface";
const customList = ["pets", "makeup"];
export async function getProducts() {
  const result = await fetch(`https://dummyjson.com/products?limit=100`).then(
    (res) => res.json()
  );
  makeup.products.map((item: Product) => {
    result.products.push(item);
  });
  pets.products.map((item: Product) => {
    result.products.push(item);
  });
  const categoriesList = await fetch(
    `https://dummyjson.com/products/categories`
  )
    .then((response) => response.json())
    .then((categories) => {
      return [...categories, ...customList];
    });
  return await { ...result, categories: categoriesList };
}

export async function getSearchedProducts(searchInput: string) {
  const prods = await getProducts();
  return ((prods.products || []) as Product[]).filter((product) =>
    product.title.toLowerCase().includes(searchInput.trim().toLowerCase())
  );
}

export function getCategories() {
  fetch(`https://dummyjson.com/products/categories`)
    .then((response) => response.json())
    .then((categories) => {
      return [...categories, ...customList];
    });
}
