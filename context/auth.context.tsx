import React, { useState, useEffect, useContext } from "react";
import InputPin from "../components/form/input-pin";
import { TextInput } from "react-native";
import secureStore from "../libs/axios/secure-store";
import { useNavigation } from "@react-navigation/native";

const AuthContext = React.createContext<{
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { navigate } = useNavigation();
  const checkToken = async () => {
    const token = await secureStore.getTokenSecure();

    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("VerifyPin" as never);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
