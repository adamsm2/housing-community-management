import { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { UserContextType } from "@/store/UserContext.types.ts";
import { UserDataResource } from "@/api/dto/UserDataResource.ts";
import localStorageKeys from "@/localstorage-keys.ts";
import UserApi from "@/api/user.ts";

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

  const setCurrentUser = (newUser: UserDataResource) => {
    setUserData(newUser);

  };

  useEffect(() => {
    const accessTokenExpirationDate = localStorage.getItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE);
    const isAccessTokenExpired = accessTokenExpirationDate ? parseInt(accessTokenExpirationDate, 10) < new Date().getTime() : true;
    if (isAccessTokenExpired && localStorage.getItem(localStorageKeys.ACCESS_TOKEN)) {
      UserApi.refreshToken()
        .then(() => {
        })
        .catch(() => {
          localStorage.removeItem(localStorageKeys.ACCESS_TOKEN_EXPIRATION_DATE);
          localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
        });
    }
    if (localStorageKeys.ACCESS_TOKEN) {
      UserApi.getCurrentUserData()
        .then((response) => {
          setUserData(response);
        });
    }
  }, []);

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