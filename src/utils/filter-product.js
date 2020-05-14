export function productFilter(products, category, brand) {


  if (category === "All Categories" && brand === "All Brands") {
    return products;
  } else if (category === "All Categories")
    return products.filter((product) => product.brand === brand);
  else if (brand === "All Brands")
    return products.filter((product) => product.category === category);
  else
    return products.filter(
      (product) => product.category === category && product.brand === brand
    );
}
