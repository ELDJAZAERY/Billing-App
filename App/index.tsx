import React, { useEffect, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./contexts/AuthContext";
import { RootStackScreen } from "./navigation";

import { LoadingScreen } from "./screens";

export default () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [userToken, setUserToken] = useState<String | null>(null);
  // const [userToken, setUserToken] = useState<String | null>("token");

  const authContext = useMemo<any>(() => {
    return {
      login: () => {
        setIsLoading(false);
        setUserToken("usetToken fetched from the Auth API");
      },
      logout: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
