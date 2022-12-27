import makeup from ".data/makeup.json";
import pets from ".data/pets.json";

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
