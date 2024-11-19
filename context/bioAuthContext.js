import React, { createContext, useState, useEffect } from "react";
import { AppState } from "react-native";
import { useRouter } from "expo-router";

export const BioAuthContext = createContext();

export const BioAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastBackgroundTime, setLastBackgroundTime] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "background") {
        setLastBackgroundTime(Date.now());
      } else if (nextAppState === "active") {
        const timeInBackground = Date.now() - lastBackgroundTime;
        if (timeInBackground > 5000) {
          // if more than 5 seconds in background then lock the app
          setAuthenticated(false);
          router.push("/auth/AppLock");
        }
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription.remove();
  }, [lastBackgroundTime]);

  const setAuthenticated = async (value) => {
    setIsAuthenticated(value);
  };

  return (
    <BioAuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </BioAuthContext.Provider>
  );
};
