import React, { useMemo } from "react";
import { storeData } from "../data";

const initContextValue: AuthContextType = {
  login: (token: string) => {},
  logout: () => {},
};

export const AuthContext =
  React.createContext<AuthContextType>(initContextValue);

export const authContext = (
  setIsLoading: Function,
  setUserToken: Function
): AuthContextType =>
  useMemo<any>(() => {
    return {
      login: (token: string) => {
        setIsLoading(false);
        storeData("userToken", token);
        setUserToken(token);
      },
      logout: () => {
        setIsLoading(false);
        storeData("userToken", "");
        setUserToken(null);
      },
    };
  }, []);
