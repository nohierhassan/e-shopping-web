import http from "./httpService";

const apiEndpoint = "https://e-shopping-iti.herokuapp.com/auth/register";

export function register(user) {
  return http.post(apiEndpoint, user);
}

export async function getUser(id) {
  const { data } = await http.get(
    "https://e-shopping-iti.herokuapp.com/v1/users"
  );
  return data.data.find((user) => user.id === id);
}


