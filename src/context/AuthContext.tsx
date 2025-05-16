import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import type { LoginCredentials, LoginResponse, User } from "../types/user";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext<{
  user: User | undefined;
  token: string | null;
  login: ({ email, password }: LoginCredentials) => void;
}>({
  user: undefined,
  token: null,
  login: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      axiosInstance.get("/client/auth/me").then((res) => {
        const data = res.data.data;
        console.log(data);
        setUser(data.user);
      });
    }
  }, []);

  const login = ({ email, password }: LoginCredentials) => {
    axiosInstance
      .post<LoginResponse>("/client/auth/login", { email, password })
      .then((res) => {
        const data = res.data.data;
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
      });
  };

  return (
    <AuthContext.Provider value={{ user, token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
