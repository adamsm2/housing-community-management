import { apiClient } from "./client.ts";

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
  const expirationDate = new Date().getTime() + response.data.expiration;
  localStorage.setItem("accessTokenExpirationDate", expirationDate.toString());
  localStorage.setItem("accessToken", response.data.jwt);
  return response.data;
}

async function logoutUser() {
  await apiClient
    .post(userControllerUrlWithRefreshToken + "logout");
  localStorage.removeItem("accessTokenExpirationDate");
  localStorage.removeItem("accessToken");
}


export default { registerUser, loginUser, logoutUser };