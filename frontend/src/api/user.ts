import { apiClient } from "./client.ts";

const userControllerUrl = "/users/";

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


export default { registerUser, loginUser };