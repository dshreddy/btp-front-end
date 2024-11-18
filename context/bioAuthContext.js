import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BioAuthContext = createContext();

export const BioAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuthenticated = async (value) => {
    setIsAuthenticated(value);
  };

  return (
    <BioAuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </BioAuthContext.Provider>
  );
};
