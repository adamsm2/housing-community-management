import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_CURRENT_USER_DATA,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  VERIFY_USER_EMAIL,
} from "@/redux/authConstants.ts";
import localStorageKeys from "@/localstorage-keys.ts";
import UserApi from "@/api/user.ts";
import { VerifyEmailRequest } from "@/api/dto/VerifyEmailRequest.ts";


export const registerUser = createAsyncThunk(
  REGISTER_USER,
  async (registerUserRequest: RegisterUserRequest) => {
    return await UserApi.registerUser(registerUserRequest);
  },
);

export const loginUser = createAsyncThunk(
  LOGIN_USER,
  async (loginUserRequest: LoginUserRequest, { dispatch }) => {
    const responseData = await UserApi.loginUser(loginUserRequest);
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, responseData.jwt);
    await dispatch(getCurrentUserData());
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

export const verifyUserEmail = createAsyncThunk(
  VERIFY_USER_EMAIL,
  async (verifyUserEmailRequest: VerifyEmailRequest, { dispatch }) => {
    const responseData = await UserApi.verifyUserEmail(verifyUserEmailRequest);
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, responseData.jwt);
    await dispatch(getCurrentUserData());
    return responseData;
  },
);