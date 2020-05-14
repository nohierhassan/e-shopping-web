import http from "./httpService";

const apiEndpoint = "https://e-shopping-iti.herokuapp.com/v1/brands";

export function getBrands() {
  return http.get(apiEndpoint);
}

export function addBrand(brand) {
  return http.post(apiEndpoint, {
    brand_name: brand,
  });
}

export function deleteBrand(brandID) {
  return http.delete(`${apiEndpoint}/${brandID}`);
}

export function editBrand(brandID, newBrand) {
  console.log(newBrand);

  return http.put(`${apiEndpoint}/${brandID}`, newBrand);
}
