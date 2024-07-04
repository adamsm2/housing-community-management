import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store.ts";
import { getCurrentUserData, loginUser, logoutUser } from "@/redux/authActions.ts";

interface AuthState {
  user?: User;
  accessToken?: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {} as AuthState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearAuth: (state) => {
      state.user = undefined;
      state.accessToken = undefined;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.accessToken = action.payload.accessToken.jwt;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = undefined;
        state.accessToken = undefined;
      })
      .addCase(getCurrentUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setAuth, clearAuth, setAccessToken } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;