import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import type {
  LoginCredentials,
  LoginResponse,
  User,
  RegisterCredentials,
  RegisterResponse,
} from "../types/user";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router";

const AuthContext = createContext<{
  user: User | null;
  token: string | null;
  login: ({ email, password }: LoginCredentials) => void;
  register: ({ name, email, password }: RegisterCredentials) => void;
  logout: () => void;
}>({
  user: null,
  token: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const localStorageUser = localStorage.getItem("user");
  const parsedUser = localStorageUser
    ? (JSON.parse(localStorageUser) as User)
    : null;
  const [user, setUser] = useState<User | null>(parsedUser);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axiosInstance.get<User>("/client/users/me").then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      });
    }
  }, []);

  const login = ({ email, password }: LoginCredentials) => {
    axiosInstance
      .post<LoginResponse>("/client/auth/login", { email, password })
      .then((res) => {
        if (!res.data.success) {
          return;
        }

        const data = res.data.data;
        afterAuthentication(data);
      });
  };

  const register = ({ name, email, password }: RegisterCredentials) => {
    axiosInstance
      .post<RegisterResponse>("/client/auth/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        if (!res.data.success) {
          return;
        }

        const data = res.data.data;
        afterAuthentication(data);
      });
  };

  const afterAuthentication = (
    data: RegisterResponse["data"] | LoginResponse["data"]
  ) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
