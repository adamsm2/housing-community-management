import { apiClient } from "@/api/client.ts";
import { useEffect, useRef } from "react";
import localStorageKeys from "@/localstorage-keys.ts";

interface Props {
  setUserData: (newUser: { email: string, firstName: string, lastName: string, role: string }) => void;
}

export const useInitAxiosInterceptors = ({ setUserData }: Props) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

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
            if (!error.response) {
              console.log("internal error");
              return Promise.reject(Error("Internal error"));
            }
            if (error.response.status !== 401 || !localStorage.getItem(localStorageKeys.ACCESS_TOKEN)) {
              return Promise.reject(Error(error));
            }
            apiClient.interceptors.response.eject(interceptor);

            return apiClient.post("/users/token/refreshToken")
              .then(response => {
                const expirationDate = new Date().getTime() + response.data.expiration;
                localStorage.setItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE, expirationDate.toString());
                localStorage.setItem(localStorageKeys.ACCESS_TOKEN, response.data.jwt);
                error.response.config.headers.Authorization =
                  "Bearer " + response.data.jwt;
                return apiClient(error.response.config);
              })
              .catch(error2 => {
                localStorage.removeItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE);
                localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
                setUserData({ email: "", firstName: "", lastName: "", role: "" });
                return Promise.reject(Error(error2));
              })
              .finally(createResponseInterceptor);
          },
        );
      };
      createRequestInterceptor();
      createResponseInterceptor();
    }
  }, []);

};
