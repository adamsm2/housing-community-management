import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/authSlice";
import apartmentsReducer from "@/redux/apartmentsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    apartments: apartmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;