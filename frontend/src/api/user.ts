import { apiClient } from "./client.ts";

const userControllerUrl = "/users/";

async function registerUser(data: RegisterUserRequest) {
  const response = await apiClient
    .post(userControllerUrl + "register", data);
  return response.data;
}

export default { registerUser };