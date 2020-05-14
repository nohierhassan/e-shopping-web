import http from "./httpService";

const apiEndpoint = "https://e-shopping-iti.herokuapp.com/v1/orders";

export function getOrders() {
  return http.get(apiEndpoint);
}

export function addOrder(order) {
  return http.post(apiEndpoint,order);
}

export function deleteOrder(orderID) {
  return http.delete(`${apiEndpoint}/${orderID}`);
}

export function editOrder(orderID, newOrder) {
  return http.put(`${apiEndpoint}/${orderID}`, newOrder);
}

export function getOrderDetails(orderID){
    return http.get(`${apiEndpoint}/${orderID}/line_items`)
}
