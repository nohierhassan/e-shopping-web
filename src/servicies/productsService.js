import http from "./httpService";

const endpointUrl = "https://e-shopping-iti.herokuapp.com/products";

export function getProducts() {
  return http.get(endpointUrl);
}
export function addProduct(product) {
  http.post(endpointUrl, product);
}
