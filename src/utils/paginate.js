export function paginate(currentPage, pageSize, products) {
  const currentIndex = (currentPage - 1) * pageSize;
  return products.slice(currentIndex, currentIndex + pageSize);
}
