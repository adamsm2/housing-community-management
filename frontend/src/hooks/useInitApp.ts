import { apiClient } from "@/api/client.ts";
import localStorageKeys from "@/localstorage-keys.ts";
import { useAppDispatch } from "@/hooks/reduxHooks.ts";
import { clearAuth, setAccessToken } from "@/redux/authSlice.ts";
import { isExpired } from "react-jwt";
import { getCurrentUserData } from "@/redux/authActions.ts";

let initialized = false;

const useInitApp = () => {
  if (!initialized) {
    initialized = true;
    useInitTheme();
    useInitAxiosInterceptors();
    useInitAuthState();
  }
};

const useInitTheme = () => {
  if (localStorage.theme === "light" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
};

const useInitAxiosInterceptors = () => {
  const dispatch = useAppDispatch();

  const createRequestInterceptor = () => {
    apiClient.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
      if (accessToken) {
        config.headers.Authorization = "Bearer " + accessToken;
      }
      return config;
    });
  };

  const createResponseInterceptor = () => {
    const interceptor = apiClient.interceptors.response.use(
      response => response,
      error => {
        const errorResponse = error.response;
        const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
        if (!errorResponse) {
          if (accessToken) {
            localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
            dispatch(clearAuth());
          }
          return Promise.reject(Error("Internal error"));
        } else if (errorResponse.status !== 401 || !accessToken || !isExpired(accessToken)) {
          return Promise.reject(Error(error));
        }
        apiClient.interceptors.response.eject(interceptor);

        return apiClient.post("/users/token/refreshToken")
          .then(response => {
            const newAccessToken = response.data.jwt;
            localStorage.setItem(localStorageKeys.ACCESS_TOKEN, newAccessToken);
            dispatch(setAccessToken(newAccessToken));
            error.response.config.headers.Authorization =
              "Bearer " + response.data.jwt;
            return apiClient(error.response.config);
          })
          .catch(error2 => {
            localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
            dispatch(clearAuth());
            return Promise.reject(Error(error2));
          })
          .finally(createResponseInterceptor);
      },
    );
  };

  createRequestInterceptor();
  createResponseInterceptor();
};

const useInitAuthState = () => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
  if (accessToken) {
    dispatch(setAccessToken(accessToken));
    dispatch(getCurrentUserData());
  }
};


export default useInitApp;