import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Context
const AuthContext = createContext();

// Provider
const AuthProvider = ({ children }) => {
  // Global state
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  // Load local storage data on initialization
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      setState({ user: loginData?.user, token: loginData?.token });
    };
    loadLocalStorageData();
  }, []);

  // Default axios setting
  axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  // axios.defaults.baseURL = "https://mha-backend-peif.onrender.com/";
  axios.defaults.baseURL = "http://10.128.3.244:8080/";

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
