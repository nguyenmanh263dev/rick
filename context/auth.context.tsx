import React, { useState, useEffect, useContext } from "react";
import secureStore from "../libs/axios/secure-store";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services";
import { IUser } from "../types";

const AuthContext = React.createContext<{
  user?: IUser;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}>({
  user: undefined,
  login: async () => {},
  logout: () => {},
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const queryClient = useQueryClient();
  const { navigate } = useNavigation();

  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthService.login(email, password),
  });

  const { data: userInfo, refetch: reloadUserInfo } = useQuery({
    queryKey: ["my-info"],
    queryFn: () =>
      AuthService.getMyInfo()
        .then((res) => {
          navigate("Dashboard" as never);
          return res;
        })
        .catch((e) => {
          navigate("Login" as never);
          return e;
        }),
  });

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await loginMutation({ email, password });
      if (response?.token) {
        const tokenString = String(response.token.token);
        console.log("Token received:", response?.token, tokenString);
        await secureStore.saveTokenSecure(tokenString);

        reloadUserInfo();
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
    }
  };

  const logout = async () => {
    await secureStore.removeTokenSecure();
    queryClient.setQueryData(["my-info"], null);
    navigate("Login" as never);
  };

  return (
    <AuthContext.Provider
      value={{ user: userInfo, login, logout, isLoading: false }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
