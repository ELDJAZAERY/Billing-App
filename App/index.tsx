import React, { useEffect, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./contexts/AuthContext";
import { RootStackScreen } from "./navigation";

import { LoadingScreen } from "./screens";
import { getData, storeData } from "./data";

export default () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [userToken, setUserToken] = useState<String | null>(null);
  // const [userToken, setUserToken] = useState<String | null>("token");

  const authContext = useMemo<any>(() => {
    return {
      login: (token: string) => {
        setIsLoading(false);
        storeData("userToken", token);
        setUserToken(token);
      },
      logout: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  useEffect(() => {
    // get stored token
    getData("userToken")
      .then((token) => {
        if (token !== "") setUserToken(token);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
