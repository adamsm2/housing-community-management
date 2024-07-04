import { apiClient } from "./client.ts";

const userControllerUrl = "/users/";
const userControllerUrlWithRefreshToken = "/users/token/";

async function registerUser(registerUserRequest: RegisterUserRequest) {
  const response = await apiClient
    .post(userControllerUrl + "register", registerUserRequest);
  return response.data;
}

async function loginUser(loginUserRequest: LoginUserRequest) {
  const response = await apiClient
    .post(userControllerUrl + "login", loginUserRequest);
  return response.data;
}

async function logoutUser() {
  await apiClient
    .post(userControllerUrlWithRefreshToken + "logout");
}

async function getCurrentUserData() {
  const response = await apiClient
    .get(userControllerUrl + "current");
  return response.data;
}


export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserData,
};