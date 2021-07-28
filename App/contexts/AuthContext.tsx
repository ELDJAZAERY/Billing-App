import React from "react";

const initContextValue: AuthContextType = {
  login: (token: string) => {},
  logout: () => {},
};

export const AuthContext =
  React.createContext<AuthContextType>(initContextValue);
