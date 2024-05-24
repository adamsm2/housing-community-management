import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response, " : ", error);
    return Promise.reject(error);
  },
);