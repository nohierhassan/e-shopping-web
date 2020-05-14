export function sortProducts(products, element, order) {
  if (order === "asc") return products.sort(products[element]);
  return products.reverse(products[element]);
}
