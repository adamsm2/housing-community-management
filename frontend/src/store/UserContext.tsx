import { createContext, PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { UserContextType } from "@/store/UserContext.types.ts";
import { UserDataResource } from "@/api/dto/UserDataResource.ts";
import localStorageKeys from "@/localstorage-keys.ts";
import UserApi from "@/api/user.ts";
import { useInitAxiosInterceptors } from "@/hooks/useInitAxiosInterceptors.ts";

const defaultUserData: UserDataResource = {
  email: "",
  firstName: "",
  lastName: "",
  role: "",
};

export const UserContext = createContext<UserContextType>({
  userData: defaultUserData,
  setCurrentUser: () => "",
});

export const UserContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [userData, setUserData] = useState<UserDataResource>(
    defaultUserData,
  );

  useInitAxiosInterceptors({ setUserData });
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const accessTokenExpirationDate = localStorage.getItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE);
      const isAccessTokenExpired = accessTokenExpirationDate ? parseInt(accessTokenExpirationDate, 10) < new Date().getTime() : true;
      const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
      if (isAccessTokenExpired && accessToken) {
        UserApi.refreshToken()
          .then(() => {
            UserApi.getCurrentUserData()
              .then((response) => {
                setUserData(response);
              });
          })
          .catch(() => {
            localStorage.removeItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE);
            localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
          });
      } else if (accessToken) {
        UserApi.getCurrentUserData()
          .then((response) => {
            setUserData(response);
          });
      }
    }
  }, []);

  const setCurrentUser = (newUser: UserDataResource) => {
    setUserData(newUser);
  };

  const value = useMemo(() => ({
    userData,
    setCurrentUser,
  }), [userData]);

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};