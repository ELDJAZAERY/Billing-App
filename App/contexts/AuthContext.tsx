import React from "react";

const initContextValue: AuthContextType = {
  login: () => {},
  logout: () => {},
};

export const AuthContext =
  React.createContext<AuthContextType>(initContextValue);
