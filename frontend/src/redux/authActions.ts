import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CURRENT_USER_DATA, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "@/redux/authConstants.ts";
import localStorageKeys from "@/localstorage-keys.ts";
import UserApi from "@/api/user.ts";


export const registerUser = createAsyncThunk(
  REGISTER_USER,
  async (registerUserRequest: RegisterUserRequest) => {
    return await UserApi.registerUser(registerUserRequest);
  },
);

export const loginUser = createAsyncThunk(
  LOGIN_USER,
  async (loginUserRequest: LoginUserRequest) => {
    const responseData = await UserApi.loginUser(loginUserRequest);
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, responseData.accessToken.jwt);
    return responseData;
  },
);

export const logoutUser = createAsyncThunk(
  LOGOUT_USER,
  async () => {
    await UserApi.logoutUser();
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
  },
);

export const getCurrentUserData = createAsyncThunk(
  GET_CURRENT_USER_DATA,
  async () => {
    return await UserApi.getCurrentUserData();
  },
);