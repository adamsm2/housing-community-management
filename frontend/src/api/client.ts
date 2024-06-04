import axios from "axios";
import localStorageKeys from "@/localstorage-keys.ts";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = "Bearer " + accessToken;
  }
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    /*    if ((error.response.status === 401 || error.response.status === 500) && !window.location.href.includes(paths.auth.login)) {
          window.location.href = paths.auth.login;
        }*/
    console.log(error.response, " : ", error);
    return Promise.reject(error);
  },
);