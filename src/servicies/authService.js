import http from "./httpService";
import jwtDecode from "jwt-decode";
import { getUser } from "./usersService";

const tokenKey = "token";

http.setJwt(getJwt());

const apiEndpoint = "https://e-shopping-iti.herokuapp.com/auth/login";

export async function login(email, password) {
  const response = await http.post(apiEndpoint, { email, password });
  const jwt = response.data.access_token;
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function isAdmin() {
  const userID = getCurrentUser().user_id;
  const user = await getUser(userID);
  return user.is_Admin;
}
