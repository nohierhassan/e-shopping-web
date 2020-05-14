import http from "./httpService";

const apiEndpoint = "https://e-shopping-iti.herokuapp.com/v1/categories";

export function getCategories() {
  return http.get(apiEndpoint);
}

export async function addCategory(category) {
  return http.post(apiEndpoint, {
    category_name: category,
  });
}

export function deleteCategory(categoryID) {
  return http.delete(`${apiEndpoint}/${categoryID}`, {});
}

export function editCategory(categoryID, newCategory) {
  console.log(newCategory);
  
  return http.put(`${apiEndpoint}/${categoryID}`, newCategory);
}
