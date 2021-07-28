import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { authContext, AuthContext } from "./contexts/AuthContext";
import { RootStackScreen } from "./navigation";

import { LoadingScreen } from "./screens";
import { getData } from "./data";

export default () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [userToken, setUserToken] = useState<String | null>(null);

  // initialize the Auth Context Provider
  const authContextProvider = authContext(setIsLoading, setUserToken);

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
    <AuthContext.Provider value={authContextProvider}>
        <NavigationContainer>
          <RootStackScreen userToken={userToken} />
        </NavigationContainer>
    </AuthContext.Provider>
  );
};
