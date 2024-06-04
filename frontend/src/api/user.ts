import { apiClient } from "./client.ts";
import localStorageKeys from "@/localstorage-keys.ts";
import { UserContextType } from "@/store/UserContext.types.ts";

const userControllerUrl = "/users/";
const userControllerUrlWithRefreshToken = "/users/token/";

async function registerUser(data: RegisterUserRequest) {
  const response = await apiClient
    .post(userControllerUrl + "register", data);
  return response.data;
}

async function loginUser(data: LoginUserRequest) {
  const response = await apiClient
    .post(userControllerUrl + "login", data);
  const expirationDate = new Date().getTime() + response.data.accessToken.expiration;
  localStorage.setItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE, expirationDate.toString());
  localStorage.setItem(localStorageKeys.ACCESS_TOKEN, response.data.accessToken.jwt);
  return response.data.userData;
}

async function logoutUser() {
  await apiClient
    .post(userControllerUrlWithRefreshToken + "logout");
  localStorage.removeItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE);
  localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
}

async function refreshToken() {
  const response = await apiClient
    .post(userControllerUrlWithRefreshToken + "refreshToken");
  const expirationDate = new Date().getTime() + response.data.expiration;
  localStorage.setItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE, expirationDate.toString());
  localStorage.setItem(localStorageKeys.ACCESS_TOKEN, response.data.jwt);
}

async function getCurrentUserData() {
  const response = await apiClient
    .get(userControllerUrl + "current");
  const userData: UserContextType = response.data;
  console.log(userData);
  return response.data;
}


export default { registerUser, loginUser, logoutUser, refreshToken, getCurrentUserData };